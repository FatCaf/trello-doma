import { useState, useEffect, useRef } from 'react';
import * as React from 'react';
import { useParams } from 'react-router';
import BoardColumn from '../components/BoardColumn';
import Settings from '../components/Settings';
import '../styles/Board.scss';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addColumn, editBoard, fetchBoard } from '../store/slices/boardSlice';
import { IBoardEdit, IColumnPost } from '../models/models';
import { openModal } from '../store/slices/modalSlice';
import { closeInput, openInput } from '../store/slices/inputSlice';
import useOutsideClick from '../hooks/useOutsideClick';
import BoardLoader from '../components/BoardLoader';
import BoardError from '../components/BoardError';
import BoardSideBar from '../components/BoardSideBar';

export default function Board(): JSX.Element {
  const [columnTitle, setColumnTitle] = useState('Безіменна колонка');
  const { boardId } = useParams<{ boardId: string }>();
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.board);
  const { board } = useAppSelector((state) => state.board);
  const { lists } = useAppSelector((state) => state.board.board);
  const backgroundColor = useAppSelector((state) => state.board.board.custom.background);
  const { inputs } = useAppSelector((state) => state.input);
  const { modals } = useAppSelector((state) => state.modal);
  const addColumnRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(fetchBoard(boardId));
  }, [boardId, dispatch]);

  useEffect(() => {
    document.body.style.backgroundColor = backgroundColor;
  }, [backgroundColor]);

  useOutsideClick(titleRef.current, () => {
    dispatch(closeInput());
  });

  useOutsideClick(addColumnRef.current, () => {
    dispatch(closeInput());
  });

  const handleAdd = async (event: React.MouseEvent<HTMLFormElement>): Promise<void> => {
    try {
      event.preventDefault();
      const postData: IColumnPost = {
        boardId,
        data: {
          title: columnTitle,
          position: lists.length ? lists.length + 1 : 1,
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
            background: backgroundColor,
          },
        },
      };
      await dispatch(editBoard(editData));
      dispatch(closeInput());
      await dispatch(fetchBoard(boardId));
    } catch (e: unknown) {
      const error = e as string;
      throw new Error(error);
    }
  };

  const handleInputClick = (inputId: string, event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    event.stopPropagation();
    dispatch(openInput({ id: inputId }));
  };

  const handleModalClick = (modal: string | null, event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    event.stopPropagation();
    dispatch(openModal({ modalName: modal }));
  };

  return (
    <div className="board" key={boardId} id={`${boardId}`}>
      {status === 'loading' && <BoardLoader />}
      {status === 'rejected' && <BoardError />}
      <BoardSideBar />
      <div className="board__main__content">
        <div className="board__header">
          <div id={`${boardId}`} ref={titleRef} onClick={(event) => handleInputClick(event.currentTarget.id, event)}>
            {inputs[0]?.id === `${boardId}` ? (
              <form onSubmit={handleEdit} name="boardTitle" className="input__form">
                <input
                  className="form__input"
                  type="text"
                  placeholder="Введіть назву дошки"
                  name="boardTitle"
                  maxLength={16}
                  minLength={1}
                  required
                  onChange={(event) => setColumnTitle(event?.target.value)}
                />
                <button className="add" type="submit">
                  Змінити
                </button>
              </form>
            ) : (
              <h2>{board.title}</h2>
            )}
          </div>
          <div
            data-name="settings"
            className="settings"
            onClick={(event) => handleModalClick(event.currentTarget.getAttribute('data-name'), event)}
          >
            <div className={`bars ${modals[0]?.modalName === 'settings' ? 'active' : ''}`}>
              <div className="top bar" />
              <div className="mid bar" />
              <div className="bottom bar" />
            </div>
          </div>
        </div>
        <div className="columns" key="columns">
          {lists && lists.map((list) => <BoardColumn {...list} key={list?.id} />)}
          <div
            className="add__column"
            id={`${typeof boardId === 'number' ? boardId : (boardId as never) + 1}`}
            ref={addColumnRef}
            onClick={(event) => handleInputClick(event.currentTarget.id, event)}
          >
            {inputs[0]?.id === `${typeof boardId === 'number' ? boardId : (boardId as never) + 1}` ? (
              <form onSubmit={handleAdd} name="columnTitle" className="input__form">
                <input
                  className="form__input"
                  type="text"
                  placeholder="Введіть назву колонки"
                  name="columnTitle"
                  maxLength={16}
                  minLength={1}
                  required
                  onChange={(event) => setColumnTitle(event?.target.value)}
                />
                <button className="add" type="submit">
                  Додати
                </button>
              </form>
            ) : (
              <p>
                <span>+</span> Додати нову колонку
              </p>
            )}
          </div>
        </div>
        {modals[0]?.modalName === 'settings' && <Settings />}
      </div>
    </div>
  );
}
