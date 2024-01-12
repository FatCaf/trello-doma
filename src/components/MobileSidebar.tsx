import { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { deleteBoard, fetchBoards } from '../store/slices/homeSlice';
import { closeModal, openModal } from '../store/slices/modalSlice';
import BoardPreview from './BoardPreview';
import AddBoardModal from './AddBoardModal';
import addSvg from '../assets/add.svg';
import '../styles/MobileSidebar.scss';

export default function MobileSidebar(): JSX.Element {
  const dispatch = useAppDispatch();
  const [isHidden, setHidden] = useState(false);
  const { status } = useAppSelector((state) => state.boards);
  const { boards } = useAppSelector((state) => state.boards);
  const { modals } = useAppSelector((state) => state.modal);

  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);

  const handleDelete = (event: React.MouseEvent<HTMLDivElement>): void => {
    const name = event.currentTarget.getAttribute('data-name');
    const boardID = event.currentTarget.getAttribute('id');
    confirmAlert({
      title: 'Видалити дошку',
      message: `Чи точно ви хочете видалити дошку ${name}`,
      buttons: [
        {
          label: 'Так',
          onClick: async (): Promise<void> => {
            try {
              await dispatch(deleteBoard(boardID));
              if (status !== 'rejected') {
                await dispatch(fetchBoards());
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

  const handleModalClick = (modal: string | null, event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    event.stopPropagation();
    dispatch(openModal({ modalName: modal }));
  };

  return (
    <aside className={`sidebar ${modals[0]?.modalName === 'mobile-sidebar' ? 'showed' : 'hidden'} onboard`}>
      <div
        className="hide onsidebar"
        onClick={() => {
          dispatch(closeModal());
          setHidden(false);
        }}
      >
        <div className="arrow" style={{ borderBottom: '2px solid #f1f2f4', borderLeft: '2px solid #f1f2f4' }} />
      </div>
      <div className="sidebar__header">
        <div className={isHidden ? 'header__wrapper veiled' : 'header__wrapper'}>
          <div className="sidebar__title">
            <h2>Мої дошки</h2>
          </div>
          <div
            className="sidebar__add"
            data-name="add-board"
            onClick={(event) => handleModalClick(event.currentTarget.getAttribute('data-name'), event)}
          >
            <img src={addSvg} alt="Додати" />
          </div>
        </div>
      </div>
      <div className="sidebar__boards" style={isHidden ? { overflow: 'hidden' } : {}}>
        {boards &&
          boards.map((board) => (
            <div className={isHidden ? 'board__link veiled' : 'board__link'} key={board.id}>
              <Link to={`/board/${board.id}`} key={board.id}>
                <BoardPreview {...board} key={board.id} />
              </Link>
              <div className="board__delete" id={`${board.id}`} data-name={board.title} onClick={handleDelete}>
                <span>X</span>
              </div>
            </div>
          ))}
      </div>
      {modals[0]?.modalName === 'add-board' && <AddBoardModal />}
    </aside>
  );
}
