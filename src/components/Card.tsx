/* eslint-disable no-console */
import * as React from 'react';
import { useNavigate, useParams } from 'react-router';
import { ICard } from '../models/models';
import '../styles/Card.scss';
import { useAppDispatch } from '../store/hooks';
import { openModal } from '../store/slices/modalSlice';

export default function ColumnCard({ id, title }: ICard): JSX.Element {
  const dispatch = useAppDispatch();
  const ids = useParams<{ boardId: string }>();
  const boardId = ids.boardId as string;
  const navigate = useNavigate();

  const handleModalClick = (
    modal: string | null,
    ID: string,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    event.stopPropagation();
    navigate(`/board/${boardId}/card/${event.currentTarget.id}`);
    dispatch(openModal({ modalName: modal, ID }));
  };

  return (
    <div className="drag__wrapper" id={`${id}`} key={id}>
      <div
        className="card"
        key={id}
        data-name="card"
        id={`${id}`}
        onClick={(event) =>
          handleModalClick(event.currentTarget.getAttribute('data-name'), event.currentTarget.id, event)
        }
      >
        <div className="card__title">
          <h4>{title}</h4>
        </div>
      </div>
    </div>
  );
}
