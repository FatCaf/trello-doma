import { useEffect } from 'react';
import * as React from 'react';
import '../styles/Home.scss';
import { Link } from 'react-router-dom';
import BoardPreview from '../components/BoardPreview';
import AddBoardModal from '../components/AddBoardModal';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchBoards } from '../store/slices/homeSlice';
import { openModal } from '../store/slices/modalSlice';
import { handleDelete } from '../common/handlers/handlers';
import { IHandleDelete } from '../models/models';

export default function Home(): JSX.Element {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.boards);
  const { boards } = useAppSelector((state) => state.boards);
  const { modals } = useAppSelector((state) => state.modal);

  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    const props: IHandleDelete = {
      itemName: 'board',
      event,
      dispatch,
      boardId: event.currentTarget.id,
    };
    handleDelete(props);
  };

  const handleModalClick = (modal: string | null, event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    event.stopPropagation();
    dispatch(openModal({ modalName: modal }));
  };

  return (
    <div className="container">
      <div className="home">
        <div className="home__title">
          <h2>Ваші дошки</h2>
        </div>
        <div className="board__grid">
          {status === 'loading' && <h2>Loading...</h2>}
          {boards &&
            boards.map((board) => (
              <div className="board__link" key={board?.id}>
                <Link to={`/board/${board?.id}`} key={board?.id}>
                  <BoardPreview {...board} key={board?.id} />
                </Link>
                <div
                  className="board__delete"
                  id={`${board?.id}`}
                  data-name={board?.title}
                  onClick={(event) => handleClick(event)}
                >
                  <span>X</span>
                </div>
              </div>
            ))}
          <div
            data-name="add-board"
            className="add__board"
            onClick={(event) => handleModalClick(event.currentTarget.getAttribute('data-name'), event)}
          >
            <p>
              <span>+</span> Додати нову дошку
            </p>
          </div>
        </div>
        {modals[0]?.modalName === 'add-board' && <AddBoardModal />}
      </div>
    </div>
  );
}
