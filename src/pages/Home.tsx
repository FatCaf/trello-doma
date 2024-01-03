import React, { useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { confirmAlert } from 'react-confirm-alert';
import '../styles/Home.scss';
import { Link } from 'react-router-dom';
import BoardPreview from '../components/BoardPreview';
import AddBoardModal from '../components/AddBoardModal';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { deleteBoard, fetchBoards } from '../store/slices/homeSlice';
import { openModal } from '../store/slices/modalSlice';

export default function Home(): JSX.Element {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.boards);
  const { boards } = useAppSelector((state) => state.boards);
  const isOpen = useAppSelector((state) => state.modal.isOpen);

  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);

  const handleChanges = async (): Promise<void> => {
    dispatch(fetchBoards());
  };

  const handleDelete = (event: React.MouseEvent<HTMLDivElement>): void => {
    const name = event.currentTarget.getAttribute('data-name');
    const boardId = event.currentTarget.getAttribute('id');
    confirmAlert({
      title: 'Видалити дошку',
      message: `Чи точно ви хочете видалити дошку ${name}`,
      buttons: [
        {
          label: 'Так',
          onClick: async (): Promise<void> => {
            try {
              await dispatch(deleteBoard(boardId));
              if (status !== 'rejected') {
                handleChanges();
              }
            } catch (e: unknown) {
              const error = e as string;
              throw new Error(error);
            }
          },
        },
        {
          label: 'Ні',
          // eslint-disable-next-line no-console
          onClick: () => console.log('no delete'),
        },
      ],
    });
  };

  return (
    <div className="home">
      <div className="board__grid">
        {status === 'loading' && <h2>Loading...</h2>}
        {boards &&
          boards.map((board) => (
            <div className="board__link" key={board?.id}>
              <Link to={`/board/${board?.id}`} key={board?.id}>
                <BoardPreview {...board} key={board?.id} />
              </Link>
              <div className="board__delete" id={`${board?.id}`} data-name={board?.title} onClick={handleDelete}>
                <span>X</span>
              </div>
            </div>
          ))}
        <div className="add__board" onClick={() => dispatch(openModal())}>
          <p>
            <span>+</span> Додати нову дошку
          </p>
        </div>
      </div>
      {isOpen && <AddBoardModal />}
    </div>
  );
}
