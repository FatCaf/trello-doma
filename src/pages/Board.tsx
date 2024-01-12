import { useState, useEffect } from 'react';
import * as React from 'react';
import { useParams } from 'react-router';
import BoardColumn from '../components/BoardColumn';
import Settings from '../components/Settings';
import '../styles/Board.scss';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addColumn, fetchBoard } from '../store/slices/boardSlice';
import { IColumnPost } from '../models/models';
// import { openModal } from '../store/slices/modalSlice';
import BoardLoader from '../components/BoardLoader';
import BoardError from '../components/BoardError';
import BoardSideBar from '../components/BoardSideBar';
import InputField from '../components/InputField';
import BoardHeader from '../components/BoardHeader';

export default function Board(): JSX.Element {
  const [title, setTitle] = useState('Безіменна колонка');
  const { boardId } = useParams<{ boardId: string }>();
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.board);
  const { board } = useAppSelector((state) => state.board);
  const { lists } = useAppSelector((state) => state.board.board);
  const backgroundColor = useAppSelector((state) => state.board.board.custom.background);
  const { modals } = useAppSelector((state) => state.modal);
  const [isAddColumnClicked, setAddColumnClicked] = useState(false);

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

  // const handleModalClick = (modal: string | null, event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
  //   event.stopPropagation();
  //   dispatch(openModal({ modalName: modal }));
  // };

  return (
    <div className="board" key={boardId} id={`${boardId}`}>
      {status === 'rejected' && <BoardError />}
      <BoardSideBar />
      {status === 'loading' && <BoardLoader />}
      <div className="board__wrapper">
        <BoardHeader boardTitle={board.title} backgroundColor={backgroundColor} />
        <div className="board__main__content">
          <ol className="columns" key="columns">
            {lists &&
              lists.map((list) => (
                <li key={list?.id}>
                  <BoardColumn {...list} key={list?.id} />
                </li>
              ))}
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
          </ol>
        </div>
        {modals[0]?.modalName === 'settings' && <Settings />}
      </div>
    </div>
  );
}
