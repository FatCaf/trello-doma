import React from 'react';
import ColumnCard from './ColumnCard';
import '../styles/BoardColumn.scss';
import { IBoardColumn } from '../models/models';

export default function BoardColumn({ title, cards }: IBoardColumn): JSX.Element {
  return (
    <div className="column">
      <div className="column__title">
        <h4>{title}</h4>
      </div>
      <div className="column__cards">
        {cards?.map((card) => <ColumnCard {...card} key={card.id} />)}
        <div className="add__card">
          <p>
            <span>+</span> Додати нову картку
          </p>
        </div>
      </div>
    </div>
  );
}
