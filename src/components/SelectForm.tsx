/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-shadow */
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ICard, ICardDelete, IColumn, IEditPos, IHandleAdd, ISelectForm } from '../models/models';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import '../styles/SelectForm.scss';
import instance from '../api/requests';
import { handleAdd } from '../common/handlers/handlers';
import { deleteCard } from '../store/slices/cardSlice';
import { fetchBoard } from '../store/slices/boardSlice';
import editPosition from '../common/handlers/positionEditor';

export default function SelectForm({ actionType, listId, cardId }: ISelectForm): JSX.Element {
  const dispatch = useAppDispatch();
  const boards = useAppSelector((state) => state.boards.boards);
  const allBoards = useAppSelector((state) => state.cardModal.allBoards);
  const ids = useParams<{ boardId: string }>();
  const boardId = ids.boardId as string;
  const columns = useAppSelector((state) => state.board.board.lists);
  const [toBoard, setToBoard] = useState(boardId);
  const [toList, setToList] = useState(listId);
  const [lists, setLists] = useState<IColumn[]>(allBoards[boardId].lists);
  const [cards, setCards] = useState<ICard[]>(lists.find((list) => list.id === listId)?.cards as ICard[]);
  const [selectedCard] = useState<ICard>(cards.find((card) => card.id === Number(cardId)) as ICard);
  const [position, setPosition] = useState(1);
  const [newCardTitle, setNewCardTitle] = useState('');
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>, itemName: string): void => {
    const itemId = event.target.value;

    switch (itemName) {
      case 'board':
        setToBoard(itemId);
        setLists(allBoards[itemId].lists);
        break;

      case 'column':
        setToList(Number(itemId));
        setCards(lists.find((list) => list.id === Number(itemId))?.cards as ICard[]);
        setPosition(cards.length > 0 ? selectedCard.position : 1);
        break;

      case 'position':
        setPosition(Number(event.currentTarget.value));
        break;

      default:
        break;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>, actionType: string): Promise<void> => {
    event.preventDefault();
    const addData = {
      title: newCardTitle.length > 0 ? newCardTitle : selectedCard.title,
      description: selectedCard.description,
      position,
      list_id: toList,
    };

    const props: IHandleAdd = {
      action: 'addCard',
      boardId: toBoard,
      dispatch,
      data: addData,
    };

    if (actionType === 'copy') {
      await handleAdd(props);
    } else if (actionType === 'move') {
      const Posprops: IEditPos = {
        elementId: Number(cardId),
        elementsArray: columns,
        itemName: 'card',
      };

      const deleteData: ICardDelete = {
        boardId,
        cardId: String(selectedCard.id),
      };
      const posArray = editPosition(Posprops);
      if (posArray.length > 0) await instance.put(`board/${boardId}/card`, posArray);
      await handleAdd(props);
      await dispatch(deleteCard(deleteData));
      navigate(`/board/${boardId}`);
      await dispatch(fetchBoard(boardId));
    }
  };

  return (
    <form className="form__container" onSubmit={(e) => handleSubmit(e, actionType)}>
      {actionType === 'copy' && (
        <div className="name__input">
          <label>Назва</label>
          <input
            type="text"
            defaultValue={selectedCard.title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewCardTitle(e.target.value)}
          />
        </div>
      )}
      <div className="select select-board">
        <label>Дошка</label>
        <select name="board" key="board" onChange={(e) => handleChange(e, 'board')}>
          {boards &&
            boards.map((board) => (
              <option key={board.id} value={board.id} selected={boardId === String(board.id)}>
                {board.title}
              </option>
            ))}
        </select>
      </div>
      <div className="select select-column">
        <label>Колонка</label>
        <select name="column" key="column" onChange={(e) => handleChange(e, 'column')}>
          {allBoards[toBoard].lists.map((list) => (
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
