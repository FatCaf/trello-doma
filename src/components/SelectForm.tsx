/* eslint-disable @typescript-eslint/no-shadow */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { IBoard, ICard, ICardDelete, IColumn, IEditPos, IHandleAdd } from '../models/models';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import '../styles/SelectForm.scss';
import instance from '../api/requests';
import { handleAdd } from '../common/handlers/handlers';
import { deleteCard } from '../store/slices/cardSlice';
import { fetchBoard } from '../store/slices/boardSlice';
import editPosition from '../common/handlers/positionEditor';

export default function SelectForm({ actionType }: { actionType: string }): JSX.Element {
  const dispatch = useAppDispatch();
  const boards = useAppSelector((state) => state.boards.boards);
  const boardTitle = useAppSelector((state) => state.board.board.title);
  const ID = useAppSelector((state) => state.modal.modals[0]?.ID);
  const ids = useParams<{ boardId: string }>();
  const boardId = ids.boardId as string;
  const [toBoard, setToBoard] = useState('');
  const [listId, setListId] = useState<number>(0);
  const [selectedCard, setSelectedCard] = useState<ICard>(Object);
  const [position, setPosition] = useState(1);
  const [allBoards, setAllBoards] = useState<IBoard[]>([]);
  const [lists, setLists] = useState<IColumn[]>([]);
  const [cards, setCards] = useState<ICard[]>([]);

  useEffect(() => {
    const fetchBoardsSequentially = async (): Promise<void> => {
      try {
        const fetchedBoards: IBoard[] = [];

        // eslint-disable-next-line no-restricted-syntax
        for (const item of boards) {
          // eslint-disable-next-line no-await-in-loop
          const response: IBoard = await instance.get(`/board/${item.id}`);
          fetchedBoards.push(response);
        }

        setAllBoards(fetchedBoards);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching boards:', error);
      }
    };
    fetchBoardsSequentially();
  }, [boards]);

  useEffect(() => {
    const listsInBoard: IColumn[] = [];

    allBoards.forEach((board) => {
      if (board.title === boardTitle) listsInBoard.push(...board.lists);
    });

    setToBoard(boardId);
    setLists(listsInBoard);
  }, [ID, allBoards, boardId, boardTitle]);

  useEffect(() => {
    const cardsInList: ICard[] = [];

    const foundList = lists.find((list) => list.cards.some((card) => card.id === Number(ID)));

    if (foundList) {
      cardsInList.push(...foundList.cards);
      setListId(foundList.id);
      setCards(cardsInList);
    }
  }, [ID, lists]);

  useEffect(() => {
    const foundCard = cards.find((card) => card.id === Number(ID));

    if (foundCard) {
      setPosition(foundCard.position);
      setSelectedCard(foundCard);
    }
  }, [ID, cards]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>, itemName: string): void => {
    if (itemName === 'board') {
      const selectedBoardId = event.target.value;

      const selectedBoard = boards.find((board) => board.id === Number(selectedBoardId));

      if (selectedBoard) {
        const listsInBoard: IColumn[] = [];

        allBoards.forEach((board) => {
          if (board.title === selectedBoard.title) listsInBoard.push(...board.lists);
        });

        setToBoard(String(selectedBoard.id));
        setLists(listsInBoard);
        setListId(listsInBoard[0].id);
      }
    } else if (itemName === 'column') {
      const selectedListId = event.target.value;

      const selectedList = lists.find((list) => list.id === Number(selectedListId));

      if (selectedList) {
        const cardsInList: ICard[] = [];

        lists.forEach((list) => {
          if (list.id === selectedList.id) cardsInList.push(...list.cards);
        });
        setListId(selectedList.id);
        setCards(cardsInList);
        setPosition(cardsInList.length > 0 ? cardsInList[0].position || 1 : 1);
      }
    } else if (itemName === 'position') {
      setPosition(Number(event.currentTarget.value));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>, actionType: string): Promise<void> => {
    event.preventDefault();
    if (actionType === 'copy') {
      const addData = {
        title: selectedCard.title,
        description: selectedCard.description,
        position,
        list_id: listId,
      };

      const props: IHandleAdd = {
        itemName: 'addCard',
        boardId: toBoard,
        dispatch,
        data: addData,
        refresh: toBoard === boardId,
      };
      await handleAdd(props);
    } else if (actionType === 'move') {
      const Posprops: IEditPos = {
        elementId: Number(ID),
        elementsArray: lists,
        itemName: 'card',
      };
      const addData = {
        title: selectedCard.title,
        description: selectedCard.description,
        position,
        list_id: listId,
      };
      const props: IHandleAdd = {
        itemName: 'addCard',
        boardId: toBoard,
        dispatch,
        data: addData,
        refresh: toBoard === boardId,
      };
      const deleteData: ICardDelete = {
        boardId: toBoard,
        cardId: String(selectedCard.id),
      };

      const posArray = editPosition(Posprops);
      if (posArray.length > 0) await instance.put(`board/${boardId}/card`, posArray);
      await handleAdd(props);
      await dispatch(deleteCard(deleteData));
      await dispatch(fetchBoard(boardId));
    }
  };

  return (
    <form className="form__container" onSubmit={(e) => handleSubmit(e, actionType)}>
      {actionType === 'copy' && (
        <div className="name__input">
          <label>Назва</label>
          <input type="text" defaultValue={selectedCard.title} />
        </div>
      )}
      <div className="select select-board">
        <label>Дошка</label>
        <select name="board" key="board" onChange={(e) => handleChange(e, 'board')}>
          {boards &&
            boards.map((board) => (
              <option key={board.id} value={board.id}>
                {board.title}
              </option>
            ))}
        </select>
      </div>
      <div className="select select-column">
        <label>Колонка</label>
        <select name="column" key="column" onChange={(e) => handleChange(e, 'column')}>
          {lists &&
            lists.map((list) => (
              <option key={list.id} value={list.id} selected={listId === list.id}>
                {list.title}
              </option>
            ))}
        </select>
      </div>
      <div className="select select-position">
        <label>Позиція</label>
        <select name="position" key="position" onChange={(e) => handleChange(e, 'position')}>
          {cards &&
            cards.map((card) => (
              <option key={card.id} value={card.position} selected={card.id === selectedCard.id}>
                {card.position}
              </option>
            ))}
          {cards && <option value={cards.length + 1}>{cards.length + 1}</option>}
        </select>
      </div>
      <button className="action__btn" type="submit">
        {actionType === 'copy' ? 'Копіювати' : 'Перемістити'}
      </button>
    </form>
  );
}
