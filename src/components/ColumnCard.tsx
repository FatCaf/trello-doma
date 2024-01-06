import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { useParams } from 'react-router';
import { IColumnCard, IColumnCardDelete } from '../models/models';
import '../styles/ColumnCard.scss';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchBoard } from '../store/slices/boardSlice';
import { deleteCard } from '../store/slices/cardSlice';

export default function ColumnCard({ id, title }: IColumnCard): JSX.Element {
  const dispatch = useAppDispatch();
  const { boardId } = useParams<{ boardId: string }>();
  const { status } = useAppSelector((state) => state.card);

  const handleDelete = (event: React.MouseEvent<HTMLDivElement>): void => {
    const name = event.currentTarget.getAttribute('data-name');
    const cardId = event.currentTarget.getAttribute('id');
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

  return (
    <div className="card">
      <div className="card__title">
        <h4>{title}</h4>
      </div>
      <div className="card__delete" id={`${id}`} data-name={title} onClick={handleDelete}>
        <span>X</span>
      </div>
    </div>
  );
}
