import React, { useState, useEffect } from 'react';
import BoardColumn from '../components/BoardColumn';
import Settings from '../components/Settings';
import '../styles/Board.scss';
import { IBoard } from '../models/models';
import settings from '../assets/settings.svg';

const testBoardConf: IBoard = {
  title: 'Моя тестова дошка',
  lists: [
    {
      id: 1,
      title: 'Плани',
      cards: [
        { id: 1, title: 'помити кота' },
        { id: 2, title: 'приготувати суп' },
        { id: 3, title: 'сходити в магазин' },
      ],
    },
    {
      id: 2,
      title: 'В процесі',
      cards: [{ id: 4, title: 'подивитися серіал' }],
    },
    {
      id: 3,
      title: 'Зроблено',
      cards: [
        { id: 5, title: 'зробити домашку' },
        { id: 6, title: 'погуляти з собакой' },
      ],
    },
  ],
};

export default function Board(): JSX.Element {
  const [boardTitle, setBoardTitle] = useState('Board name');
  const [bodyColor, setBodyColor] = useState('rgb(205, 90, 145)');
  const [modal, setModal] = useState(false);

  useEffect(() => {
    setBoardTitle(testBoardConf.title);
  }, []);

  useEffect(() => {
    document.body.style.backgroundColor = bodyColor;
  });

  return (
    <div className="board" key="board">
      <div className="board__header">
        <h2>{boardTitle}</h2>
        <div className="settings" onClick={() => setModal(true)}>
          <img src={settings} alt="settings" />
        </div>
      </div>
      <div className="columns">
        {testBoardConf.lists.map((list) => (
          <BoardColumn {...list} key={list.id} />
        ))}
        <div className="add__column">
          <p>
            <span>+</span> Додати ще одну колонку
          </p>
        </div>
      </div>
      {modal && <Settings closeModal={() => setModal(false)} changeBodyColor={setBodyColor} />}
    </div>
  );
}
