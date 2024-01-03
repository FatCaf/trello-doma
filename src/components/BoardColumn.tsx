import React, { useState } from 'react';
import { useParams } from 'react-router';
import { confirmAlert } from 'react-confirm-alert';
import ColumnCard from './ColumnCard';
import '../styles/BoardColumn.scss';
import { IBoardColumn, IColumnCardPost, IColumnDelete, IColumnEdit } from '../models/models';
import { addCard } from '../store/slices/cardSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { deleteColumn, editColumn, fetchBoard } from '../store/slices/boardSlice';
import { openInput } from '../store/slices/inputSlice';

export default function BoardColumn({ id, title, cards }: IBoardColumn): JSX.Element {
  const { boardId } = useParams<{ boardId: string }>();
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.card);
  const inputs = useAppSelector((state) => state.input.inputs);
  const [cardTitle, setCardTitle] = useState('Безіменна картка');
  const [columnTitle, setColumnTitle] = useState('Безіменна колонка');

  const handleAdd = async (event: React.MouseEvent<HTMLFormElement>): Promise<void> => {
    const listId = +event.currentTarget.id;
    try {
      event.preventDefault();
      const postData: IColumnCardPost = {
        boardId,
        data: {
          title: cardTitle,
          list_id: listId,
          position: 1,
          description: '',
          custom: {
            deadline: '',
          },
        },
      };
      await dispatch(addCard(postData));
      if (status === 'resolved') await dispatch(fetchBoard(boardId));
    } catch (e: unknown) {
      const error = e as string;
      throw new Error(error);
    }
  };

  const handleDelete = (event: React.MouseEvent<HTMLDivElement>): void => {
    const name = event.currentTarget.getAttribute('data-name');
    const listId = event.currentTarget.getAttribute('id');
    const deleteData: IColumnDelete = {
      boardId,
      listId,
    };

    confirmAlert({
      title: 'Видалити колонку',
      message: `Чи точно ви хочете видалити колонку ${name}`,
      buttons: [
        {
          label: 'Так',
          onClick: async (): Promise<void> => {
            try {
              await dispatch(deleteColumn(deleteData));
              if (status === 'resolved') await dispatch(fetchBoard(boardId));
            } catch (e: unknown) {
              const error = e as string;
              throw new Error(error);
            }
          },
        },
        {
          label: 'Ні',
          // eslint-disable-next-line no-console
          onClick: () => console.log('no delete'),
        },
      ],
    });
  };

  const handleEdit = async (event: React.MouseEvent<HTMLFormElement>): Promise<void> => {
    const listId = event.currentTarget.getAttribute('id');
    try {
      event.preventDefault();
      const editData: IColumnEdit = {
        boardId,
        listId,
        data: {
          title: columnTitle,
          position: 1,
        },
      };
      await dispatch(editColumn(editData));
      if (status === 'resolved') await dispatch(fetchBoard(boardId));
    } catch (e: unknown) {
      const error = e as string;
      throw new Error(error);
    }
  };

  const handleClick = (inputId: string): void => {
    dispatch(openInput({ id: inputId }));
  };

  return (
    <div className="column">
      <div className="column__header">
        <div className="column__title">
          {inputs[`${id}`] ? (
            <form id={`${id}`} onSubmit={handleEdit}>
              <input
                type="text"
                placeholder="Введіть назву колонки"
                required
                onChange={(event) => setColumnTitle(event?.target.value)}
              />
              <button type="submit">Змінити</button>
            </form>
          ) : (
            <h4 id={`${id}`} onClick={(event) => handleClick(event.currentTarget.id)}>
              {title}
            </h4>
          )}
        </div>
        <div className="column__delete" id={`${id}`} data-name={title} onClick={handleDelete}>
          <span>X</span>
        </div>
      </div>
      <div className="column__cards">
        {cards?.map((card) => <ColumnCard {...card} key={card.id} />)}
        <div
          className="add__card"
          id={`${typeof id === 'number' ? id + 1 : id}`}
          onClick={(event) => handleClick(event.currentTarget.id)}
        >
          {inputs[`${typeof id === 'number' ? id + 1 : id}`] ? (
            <form id={`${id}`} onSubmit={handleAdd}>
              <input
                type="text"
                placeholder="Введіть назву картки"
                required
                onChange={(event) => setCardTitle(event?.target.value)}
              />
              <button type="submit">Додати</button>
            </form>
          ) : (
            <p>
              <span>+</span> Додати нову картку
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
