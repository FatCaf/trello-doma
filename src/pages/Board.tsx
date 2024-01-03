import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import BoardColumn from '../components/BoardColumn';
import Settings from '../components/Settings';
import '../styles/Board.scss';
import settings from '../assets/settings.svg';
import { selectBodyColor } from '../store/slices/bodyColorSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addColumn, editBoard, fetchBoard } from '../store/slices/boardSlice';
import { IBoardEdit, IColumnPost } from '../models/models';
import { openModal } from '../store/slices/modalSlice';
import { closeInput, openInput } from '../store/slices/inputSlice';

export default function Board(): JSX.Element {
  const bodyColor = useSelector(selectBodyColor);
  const [columnTitle, setColumnTitle] = useState('Безіменна колонка');
  const { boardId } = useParams<{ boardId: string }>();
  const isOpen = useAppSelector((state) => state.modal.isOpen);
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.board);
  const { board } = useAppSelector((state) => state.board);
  const lists = useAppSelector((state) => state.board.board.lists);
  const backgroundColor = useAppSelector((state) => state.board.board.custom.background);
  const inputs = useAppSelector((state) => state.input.inputs);

  useEffect(() => {
    dispatch(fetchBoard(boardId));
  }, [boardId, dispatch]);

  useEffect(() => {
    if (backgroundColor) {
      document.body.style.backgroundColor = backgroundColor;
    } else document.body.style.backgroundColor = bodyColor;
  }, [backgroundColor, bodyColor]);

  useEffect(() => {
    const handleClose = (): void => {
      if (Object.keys(inputs).length > 0) {
        dispatch(closeInput());
      }
    };

    document.addEventListener('mousedown', handleClose);

    return () => {
      document.removeEventListener('mousedown', handleClose);
    };
  }, [inputs, dispatch]);

  const handleAdd = async (event: React.MouseEvent<HTMLFormElement>): Promise<void> => {
    try {
      event.preventDefault();
      const postData: IColumnPost = {
        boardId,
        data: {
          title: columnTitle,
          position: 1,
        },
      };
      await dispatch(addColumn(postData));
      if (status === 'resolved') await dispatch(fetchBoard(boardId));
    } catch (e: unknown) {
      const error = e as string;
      throw new Error(error);
    }
  };

  const handleEdit = async (event: React.MouseEvent<HTMLFormElement>): Promise<void> => {
    try {
      event.preventDefault();
      const editData: IBoardEdit = {
        boardId,
        data: {
          title: columnTitle,
          custom: {
            background: bodyColor,
          },
        },
      };
      await dispatch(editBoard(editData));
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
    <div className="board" key={boardId} id={`${boardId}`}>
      <div className="board__header">
        {inputs[`${boardId}`] ? (
          <form onSubmit={handleEdit}>
            <input
              type="text"
              placeholder="Введіть назву дошки"
              required
              onChange={(event) => setColumnTitle(event?.target.value)}
            />
            <button type="submit">Змінити</button>
          </form>
        ) : (
          <h2 id={`${boardId}`} onClick={(event) => handleClick(event.currentTarget.id)}>
            {board.title}
          </h2>
        )}
        <div className="settings" onClick={() => dispatch(openModal())}>
          <img src={settings} alt="settings" />
        </div>
      </div>
      <div className="columns">
        {status === 'loading' && <h2>Loading...</h2>}
        {lists && lists.map((list) => <BoardColumn {...list} key={list?.id} />)}
        <div
          className="add__column"
          id={`${typeof boardId === 'number' ? boardId : +boardId + 1}`}
          onClick={(event) => handleClick(event.currentTarget.id)}
        >
          {inputs[`${typeof boardId === 'number' ? boardId : +boardId + 1}`] ? (
            <form onSubmit={handleAdd}>
              <input
                type="text"
                placeholder="Введіть назву колонки"
                required
                onChange={(event) => setColumnTitle(event?.target.value)}
              />
              <button type="submit">Додати</button>
            </form>
          ) : (
            <p>
              <span>+</span> Додати нову колонку
            </p>
          )}
        </div>
      </div>
      {isOpen && <Settings />}
    </div>
  );
}
