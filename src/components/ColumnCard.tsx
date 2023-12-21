import React from 'react';
import { IColumnCard } from '../models/models';
import '../styles/ColumnCard.scss';

export default function ColumnCard({ title }: IColumnCard): JSX.Element {
  return (
    <div className="card">
      <div className="card__title">
        <h4>{title}</h4>
      </div>
    </div>
  );
}
