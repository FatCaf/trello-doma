import { useRef, useState } from 'react';
import * as React from 'react';
import { useParams } from 'react-router';
import Card from '../Card/Card';
import './Column.scss';
import { IColumn, IHandleDelete, IHandleEdit, IHandleAdd, IEditPos } from '../../../../models/models';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import InputField from '../../../../components/InputField';
import { handleAdd, handleDelete, handleEdit } from '../../../../common/handlers/handlers';
import editPosition from '../../../../common/handlers/positionEditor';
import instance from '../../../../api/requests';
import { deleteCard } from '../../../../store/slices/cardSlice';

export default function Column({ id, title, cards }: IColumn): JSX.Element {
  const ids = useParams<{ boardId: string }>();
  const boardId = ids.boardId as string;
  const dispatch = useAppDispatch();
  const lists = useAppSelector((state) => state.board.board.lists);
  const [isColumnTitleClicked, setColumnTitleClicked] = useState(false);
  const [isCardAddClicked, setCardAddClicked] = useState(false);
  const [cardTitle, setCardTitle] = useState('Безіменна картка');
  const [columnTitle, setColumnTitle] = useState('Безіменна колонка');
  const columnRef = useRef<HTMLDivElement>(null);

  const handleClick = async (event: React.MouseEvent<HTMLDivElement>): Promise<void> => {
    const Posprops: IEditPos = {
      elementsArray: lists,
      elementId: Number(event.currentTarget.id),
      itemName: 'column',
    };
    const posArray = editPosition(Posprops);

    const props: IHandleDelete = {
      itemName: 'column',
      event,
      dispatch,
      boardId,
    };
    await handleDelete(props);
    if (posArray.length > 0) await instance.put(`board/${boardId}/list`, posArray);
  };

  const handleInputSubmit = async (event: React.FormEvent<HTMLFormElement>, actionType: string): Promise<void> => {
    event.preventDefault();
    if (actionType === 'add') {
      const postData = {
        title: cardTitle,
        list_id: Number(event.currentTarget.id),
        position: cards.length ? cards.length + 1 : 1,
        description: '',
        custom: {
          deadline: '',
        },
      };
      const props: IHandleAdd = {
        itemName: 'addCard',
        dispatch,
        data: postData,
        boardId,
        refresh: true,
      };
      await handleAdd(props);
    } else if (actionType === 'edit') {
      const editData = {
        title: columnTitle,
        position: 1,
      };
      const props: IHandleEdit = {
        itemName: 'editColumnTitle',
        boardId,
        dispatch,
        event,
        data: editData,
      };
      await handleEdit(props);
      setColumnTitleClicked(false);
    }
  };

  const onDragEnterHandler = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
  };

  const onDragOverHandler = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    if (columnRef.current && columnRef.current.className === 'column') {
      setTimeout(() => {
        columnRef.current?.classList.add('hovered');
      }, 0);
    }
  };

  const onDragLeaveHandler = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    if (columnRef.current && columnRef.current.className === 'column hovered') {
      setTimeout(() => {
        columnRef.current?.classList.remove('hovered');
      }, 0);
    }
  };
  const onDropHandler = async (e: React.DragEvent<HTMLDivElement>): Promise<void> => {
    let cardInfo = JSON.parse(e.dataTransfer.getData('cardInfo'));

    if (cardInfo.list_id !== e.currentTarget.id) {
      cardInfo = { ...cardInfo, list_id: Number(e.currentTarget.id) };
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const { id, ...rest } = cardInfo;

      const Posprops: IEditPos = {
        elementsArray: lists,
        elementId: Number(e.currentTarget.id),
        itemName: 'card',
      };

      const posArray = editPosition(Posprops);

      const props: IHandleAdd = {
        itemName: 'addCard',
        dispatch,
        data: rest,
        boardId,
        refresh: true,
      };
      await dispatch(deleteCard({ boardId, cardId: id }));
      await handleAdd(props);
      if (posArray.length > 0) await instance.put(`board/${boardId}/card`, posArray);
    }
  };

  return (
    <div
      className="column"
      id={`${id}`}
      key={id}
      ref={columnRef}
      onDragLeave={(e: React.DragEvent<HTMLDivElement>) => onDragLeaveHandler(e)}
      onDragEnter={(e: React.DragEvent<HTMLDivElement>) => onDragEnterHandler(e)}
      onDrop={(e: React.DragEvent<HTMLDivElement>) => onDropHandler(e)}
      onDragOver={(e: React.DragEvent<HTMLDivElement>) => onDragOverHandler(e)}
    >
      <div className="column__header">
        <div className="column__title">
          {isColumnTitleClicked ? (
            <InputField
              id={id}
              buttonText="Змінити"
              placeholder="Введіть назву колонки"
              onChange={setColumnTitle}
              onSubmit={handleInputSubmit}
              onClose={() => setColumnTitleClicked(false)}
              actionType="edit"
            />
          ) : (
            <h4 onClick={() => setColumnTitleClicked(true)}>{title}</h4>
          )}
        </div>
        <div
          className="column__delete"
          id={`${id}`}
          data-name={title}
          onClick={(event) => handleClick(event)}
          style={isColumnTitleClicked ? { display: 'none' } : {}}
        >
          <div>X</div>
        </div>
      </div>
      <div className="column__cards">
        {cards &&
          [...cards].sort((cur, next) => cur.position - next.position).map((card) => <Card {...card} key={card.id} />)}
        <div className="add__card">
          {isCardAddClicked ? (
            <InputField
              id={id}
              placeholder="Введіть назву картки"
              buttonText="Додати"
              onChange={setCardTitle}
              onSubmit={handleInputSubmit}
              onClose={() => setCardAddClicked(false)}
              actionType="add"
            />
          ) : (
            <p onClick={() => setCardAddClicked(true)}>
              <span>+</span> Додати нову картку
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
