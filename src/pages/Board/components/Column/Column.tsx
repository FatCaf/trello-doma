/* eslint-disable @typescript-eslint/no-shadow */
import { useState } from 'react';
import * as React from 'react';
import { useParams } from 'react-router';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import Card from '../Card/Card';
import './Column.scss';
import { IColumn, IHandleDelete, IHandleEdit, IHandleAdd, IEditPos } from '../../../../models/models';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import InputField from '../../../../components/InputField';
import { handleAdd, handleDelete, handleEdit } from '../../../../common/handlers/handlers';
import editPosition from '../../../../common/handlers/positionEditor';
import instance from '../../../../api/requests';

export default function Column({ id, title, cards, provided }: IColumn): JSX.Element {
  const ids = useParams<{ boardId: string }>();
  const boardId = ids.boardId as string;
  const dispatch = useAppDispatch();
  const lists = useAppSelector((state) => state.board.board.lists);
  const [isColumnTitleClicked, setColumnTitleClicked] = useState(false);
  const [isCardAddClicked, setCardAddClicked] = useState(false);
  const [cardTitle, setCardTitle] = useState('Безіменна картка');
  const [columnTitle, setColumnTitle] = useState('Безіменна колонка');

  const handleClick = async (event: React.MouseEvent<HTMLDivElement>): Promise<void> => {
    const Posprops: IEditPos = {
      elementsArray: lists,
      elementId: Number(event.currentTarget.id),
      itemName: 'column',
    };
    const posArray = editPosition(Posprops);

    const props: IHandleDelete = {
      action: 'deleteColumn',
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
        action: 'addCard',
        dispatch,
        data: postData,
        boardId,
      };
      await handleAdd(props);
    } else if (actionType === 'edit') {
      const editData = {
        title: columnTitle,
      };
      const props: IHandleEdit = {
        action: 'editColumnTitle',
        boardId,
        dispatch,
        event,
        data: editData,
      };
      await handleEdit(props);
      setColumnTitleClicked(false);
    }
  };

  return (
    <div
      className="column"
      id={`${id}`}
      key={id}
      ref={provided?.innerRef}
      {...provided?.dragHandleProps}
      {...provided?.draggableProps}
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
      <Droppable droppableId={String(id)} type="card">
        {(provided): JSX.Element => (
          <div className="column__cards" {...provided.droppableProps} ref={provided.innerRef}>
            {cards &&
              cards.map((card, index) => (
                <Draggable index={index} draggableId={String(card.id)} key={card.id}>
                  {(provided): JSX.Element => <Card {...card} key={card.id} provided={provided} />}
                </Draggable>
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
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
  );
}
