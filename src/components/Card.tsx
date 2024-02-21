/* eslint-disable no-console */
import * as React from 'react';
import { useNavigate, useParams } from 'react-router';
import { useState } from 'react';
import { ICard } from '../models/models';
import '../styles/Card.scss';
import { useAppDispatch } from '../store/hooks';
import { openModal } from '../store/slices/modalSlice';

export default function ColumnCard({ id, title, description, list_id, position, users, custom }: ICard): JSX.Element {
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

  const [onHold, setOnHold] = useState(false);

  const resetClassName = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    const isCard = e.currentTarget.className === 'card' || e.currentTarget.className === 'card anotherCardOnTop';
    if (isCard) {
      setTimeout(() => {
        e.currentTarget.className = 'card';
      }, 0);
    }
  };

  const dragStartHandler = (e: React.DragEvent<HTMLDivElement>): void => {
    e.dataTransfer.setData('cardInfo', JSON.stringify({ id, title, description, list_id, position, users, custom }));
    e.currentTarget.className += ' ohhold';
    setTimeout(() => {
      setOnHold(true);
    }, 0);
  };
  const dragEndHandler = (): void => {
    setOnHold(false);
  };

  const onDragOverHandler = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    if (e.currentTarget.className === 'card') {
      setTimeout(() => {
        e.currentTarget.className = 'card anotherCardOnTop';
      }, 0);
    }
  };

  const onDragLeaveHandler = (e: React.DragEvent<HTMLDivElement>): void => {
    resetClassName(e);
  };
  const onDropHandler = (e: React.DragEvent<HTMLDivElement>): void => {
    resetClassName(e);
    /**  
     TODO: Remove all anotherCardOnTop classnames 
     from DOM after drop complete.
    */
  };

  return (
    <div
      className={`card ${onHold ? 'dragging' : ''}`}
      key={id}
      data-name="card"
      id={`${id}`}
      onClick={(event) =>
        handleModalClick(event.currentTarget.getAttribute('data-name'), event.currentTarget.id, event)
      }
      draggable
      onDragStart={(e: React.DragEvent<HTMLDivElement>) => dragStartHandler(e)}
      onDragOver={(e: React.DragEvent<HTMLDivElement>) => onDragOverHandler(e)}
      onDragEnd={dragEndHandler}
      onDrop={(e: React.DragEvent<HTMLDivElement>) => onDropHandler(e)}
      onDragLeave={(e: React.DragEvent<HTMLDivElement>) => onDragLeaveHandler(e)}
    >
      <div className="card__title">
        <h4>{title}</h4>
      </div>
    </div>
  );
}
