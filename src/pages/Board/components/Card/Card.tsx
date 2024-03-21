import * as React from 'react';
import { useNavigate, useParams } from 'react-router';
import { ICard } from '../../../../models/models';
import './Card.scss';

export default function ColumnCard({ id, title, provided }: ICard): JSX.Element {
  const ids = useParams<{ boardId: string }>();
  const boardId = ids.boardId as string;
  const navigate = useNavigate();

  const handleModalClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    event.stopPropagation();
    navigate(`/board/${boardId}/card/${event.currentTarget.id}`);
  };

  return (
    <div
      className="card"
      ref={provided?.innerRef}
      {...provided?.dragHandleProps}
      {...provided?.draggableProps}
      key={id}
      id={`${id}`}
      onClick={(event) => handleModalClick(event)}
    >
      <div className="card__title">
        <h4>{title}</h4>
      </div>
    </div>
  );
}
