import { useState, useEffect } from 'react';
import * as React from 'react';
import { useParams } from 'react-router';
import Column from './components/Column/Column';
import Settings from './components/Settings';
import './Board.scss';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchBoard } from '../../store/slices/boardSlice';
import { IHandleAdd } from '../../models/models';
import BoardLoader from './BoardLoader';
import BoardError from './BoardError';
import BoardSideBar from './components/Sidebar/BoardSideBar';
import InputField from '../../components/InputField';
import BoardHeader from './components/BoardHeader';
import MobileSidebar from './components/Sidebar/MobileSidebar';
import CardModal from './components/Card/components/CardModal';
import { handleAdd } from '../../common/handlers/handlers';

export default function Board(): JSX.Element {
  const [title, setTitle] = useState('Безіменна колонка');
  const ids = useParams<{ boardId: string }>();
  const boardId = ids.boardId as string;
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.board);
  const { board } = useAppSelector((state) => state.board);
  const { lists } = useAppSelector((state) => state.board.board);
  const backgroundColor = useAppSelector((state) => state.board.board.custom.background);
  const { modals } = useAppSelector((state) => state.modal);
  const [isAddColumnClicked, setAddColumnClicked] = useState(false);
  const urlParams = window.location.href.split('/');

  useEffect(() => {
    dispatch(fetchBoard(boardId));
  }, [boardId, dispatch]);

  useEffect(() => {
    document.body.style.backgroundColor = backgroundColor;
  }, [backgroundColor]);

  const handleInputSubmit = async (event: React.FormEvent<HTMLFormElement>, actionType: string): Promise<void> => {
    event.preventDefault();
    if (actionType === 'add') {
      const postData = {
        title,
        position: lists.length ? lists.length + 1 : 1,
      };
      const props: IHandleAdd = {
        itemName: 'addColumn',
        dispatch,
        data: postData,
        boardId,
        refresh: true,
      };
      await handleAdd(props);
    }
  };

  return (
    <div className="board" key={boardId} id={`${boardId}`}>
      {status === 'rejected' && <BoardError />}
      <BoardSideBar />
      {modals[0]?.modalName === 'mobile-sidebar' && <MobileSidebar />}
      {status === 'loading' && <BoardLoader />}
      <div className="board__wrapper">
        <BoardHeader boardTitle={board.title} backgroundColor={backgroundColor} />
        <div className="board__main__content">
          {(modals[0]?.modalName === 'card' || urlParams.includes('card')) && <CardModal />}
          <div className="columns" key="columns">
            {lists && lists.map((list) => <Column {...list} key={list?.id} />)}
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
