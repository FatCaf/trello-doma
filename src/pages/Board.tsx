import { useState, useEffect } from 'react';
import * as React from 'react';
import { useParams } from 'react-router';
import Column from '../components/Column';
import Settings from '../components/Settings';
import '../styles/Board.scss';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addColumn, fetchBoard } from '../store/slices/boardSlice';
import { IColumnPost } from '../models/models';
import BoardLoader from '../components/BoardLoader';
import BoardError from '../components/BoardError';
import BoardSideBar from '../components/BoardSideBar';
import InputField from '../components/InputField';
import BoardHeader from '../components/BoardHeader';
import MobileSidebar from '../components/MobileSidebar';

export default function Board(): JSX.Element {
  const [title, setTitle] = useState('Безіменна колонка');
  const boardId = useParams<{ boardId: string }>();
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.board);
  const { board } = useAppSelector((state) => state.board);
  const { lists } = useAppSelector((state) => state.board.board);
  const backgroundColor = useAppSelector((state) => state.board.board.custom.background);
  const { modals } = useAppSelector((state) => state.modal);
  const [isAddColumnClicked, setAddColumnClicked] = useState(false);
  // const elementData = useAppSelector((state) => state.dnd.elementData);

  useEffect(() => {
    dispatch(fetchBoard(boardId));
  }, [boardId, dispatch]);

  useEffect(() => {
    document.body.style.backgroundColor = backgroundColor;
  }, [backgroundColor]);

  const handleAdd = async (): Promise<void> => {
    try {
      const postData: IColumnPost = {
        boardId,
        data: {
          title,
          position: lists.length ? lists.length + 1 : 1,
        },
      };
      await dispatch(addColumn(postData));
      await dispatch(fetchBoard(boardId));
    } catch (e: unknown) {
      const error = e as string;
      throw new Error(error);
    }
  };

  const handleInputSubmit = async (event: React.FormEvent<HTMLFormElement>, actionType: string): Promise<void> => {
    event.preventDefault();
    if (actionType === 'add') {
      await handleAdd();
    }
  };

  // const dropHandler = async (): Promise<void> => {
  //   const { id, position } = JSON.parse(elementData);
  //   const editData: IChangePos = {
  //     boardId,
  //     listId: id,
  //     data: {
  //       position,
  //     },
  //   };
  //   await dispatch(editColPos(editData));
  // };

  const overHandler = (e: React.DragEvent): void => {
    e.preventDefault();
  };
  return (
    <div className="board" key={boardId.boardId} id={`${boardId.boardId}`}>
      {status === 'rejected' && <BoardError />}
      <BoardSideBar />
      {modals[0]?.modalName === 'mobile-sidebar' && <MobileSidebar />}
      {status === 'loading' && <BoardLoader />}
      <div className="board__wrapper">
        <BoardHeader boardTitle={board.title} backgroundColor={backgroundColor} />
        <div className="board__main__content">
          <div
            className="columns"
            // onDrop={dropHandler}
            onDragOver={(e: React.DragEvent<HTMLDivElement>) => overHandler(e)}
          >
            {lists.length > 0 &&
              [...lists]
                .sort((cur, next) => cur.position - next.position)
                .map((list) => <Column {...list} key={list?.id} />)}
            <div className="add__column__wrapper">
              <div className="add__column">
                {isAddColumnClicked ? (
                  <InputField
                    buttonText="Додати"
                    placeholder="Введіть назву колонки"
                    onChange={setTitle}
                    onSubmit={handleInputSubmit}
                    onClose={() => setAddColumnClicked(false)}
                    actionType="add"
                  />
                ) : (
                  <p onClick={() => setAddColumnClicked(true)}>
                    <span>+</span> Додати нову колонку
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        {modals[0]?.modalName === 'settings' && <Settings />}
      </div>
    </div>
  );
}
