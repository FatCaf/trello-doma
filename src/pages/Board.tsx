import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { AxiosError } from 'axios';
import { useSelector } from 'react-redux';
import BoardColumn from '../components/BoardColumn';
import Settings from '../components/Settings';
import '../styles/Board.scss';
import { IBoard } from '../models/models';
import settings from '../assets/settings.svg';
import instance from '../api/requests';
import { selectBodyColor } from '../store/slices/bodyColorSlice';

export default function Board(): JSX.Element {
  const bodyColor = useSelector(selectBodyColor);
  const { boardId } = useParams<{ boardId: string }>();
  const [board, setBoard] = useState<IBoard | null>(null);
  const [boardTitle, setBoardTitle] = useState<string | undefined>('Board name');
  const [modal, setModal] = useState(false);

  useEffect(() => {
    async function fetchTest(): Promise<void> {
      try {
        const response: IBoard = await instance.get(`/board/${boardId}`);
        setBoard(response);
      } catch (e: unknown) {
        const error = e as AxiosError;
        throw new Error(error.message);
      }
    }

    fetchTest();
  }, [boardId]);

  useEffect(() => {
    setBoardTitle(board?.title);
  }, [board?.title]);

  useEffect(() => {
    document.body.style.backgroundColor = bodyColor;
  }, [bodyColor]);

  return (
    <div className="board" key="board">
      <div className="board__header">
        <h2>{boardTitle}</h2>
        <div className="settings" onClick={() => setModal(true)}>
          <img src={settings} alt="settings" />
        </div>
      </div>
      <div className="columns">
        {board?.lists.map((list) => <BoardColumn {...list} key={list?.id} />)}
        <div className="add__column">
          <p>
            <span>+</span> Додати нову колонку
          </p>
        </div>
      </div>
      {modal && (
        <Settings
          closeModal={() => setModal(false)}
          // eslint-disable-next-line func-names
          // eslint-disable-next-line react/jsx-no-bind
          onBoardAdded={function (): void {
            throw new Error('Function not implemented.');
          }}
        />
      )}
    </div>
  );
}
