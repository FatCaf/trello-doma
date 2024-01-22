/* eslint-disable no-console */
import * as React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { useParams } from 'react-router';
import { IColumnCard, IColumnCardDelete } from '../models/models';
import '../styles/Card.scss';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchBoard } from '../store/slices/boardSlice';
import { deleteCard } from '../store/slices/cardSlice';
import { dragStarted, setDragListId, setDraggingData } from '../store/slices/dragNdropSlice';
import dragTest from '../d&d/dnd';

export default function ColumnCard({ id, title }: IColumnCard): JSX.Element {
  const dispatch = useAppDispatch();
  const boardId = useParams<{ boardId: string }>();
  const { lists } = useAppSelector((state) => state.board.board);
  const handleDelete = (event: React.MouseEvent<HTMLDivElement>): void => {
    const name = event.currentTarget.getAttribute('data-name');
    const cardId = event.currentTarget.getAttribute('id') as string;
    const deleteData: IColumnCardDelete = {
      boardId,
      cardId,
    };

    confirmAlert({
      title: 'Видалити картку',
      message: `Чи точно ви хочете видалити картку ${name}`,
      buttons: [
        {
          label: 'Так',
          onClick: async (): Promise<void> => {
            try {
              await dispatch(deleteCard(deleteData));
              await dispatch(fetchBoard(boardId));
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

  const dragStartHandler = (e: React.DragEvent): void => {
    const currentList = lists.find((list) => list.cards.some((card) => card.id === +e.currentTarget.id));
    const currentCard = lists.map((list) => list.cards.find((card) => card.id === +e.currentTarget.id));
    dispatch(setDraggingData(JSON.stringify(currentCard[0])));
    dispatch(setDragListId(currentList?.id));
    dispatch(dragStarted(e.currentTarget));
    dragTest(e.currentTarget.className);
  };

  return (
    <div
      className="drag__wrapper"
      id={`${id}`}
      draggable
      onDragStart={(e: React.DragEvent<HTMLDivElement>) => dragStartHandler(e)}
      key={id}
    >
      <div className="card" key={id}>
        <div className="card__title">
          <h4>{title}</h4>
        </div>
        <div className="card__delete" id={`${id}`} data-name={title} onClick={handleDelete}>
          <div>X</div>
        </div>
      </div>
    </div>
  );
}
