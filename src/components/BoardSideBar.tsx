import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { deleteBoard, fetchBoards } from '../store/slices/homeSlice';
import '../styles/BoardSidebar.scss';
import BoardPreview from './BoardPreview';
import { openModal } from '../store/slices/modalSlice';
import addSvg from '../assets/add.svg';
import AddBoardModal from './AddBoardModal';

export default function BoardSideBar(): JSX.Element {
  const dispatch = useAppDispatch();
  const [isHidden, setHidden] = useState(false);
  const { boardId } = useParams<{ boardId: string }>();
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
    <div className={`sidebar ${isHidden ? 'hidden' : 'showed'}`}>
      <div
        className="hide"
        onClick={() => {
          if (isHidden) setHidden(!isHidden);
          setHidden(!isHidden);
        }}
      >
        <div
          className="arrow"
          style={
            !isHidden
              ? { borderBottom: '2px solid #f1f2f4', borderLeft: '2px solid #f1f2f4' }
              : { borderTop: '2px solid #f1f2f4', borderRight: '2px solid #f1f2f4' }
          }
        />
      </div>
      <div className="sidebar__header">
        <div className="sidebar__title">
          <h2>Мої дошки</h2>
        </div>
        <div
          className="sidebar__add"
          data-name="add-board"
          onClick={(event) => handleModalClick(event.currentTarget.getAttribute('data-name'), event)}
          style={isHidden ? { display: 'none' } : {}}
        >
          <img src={addSvg} alt="Додати" />
        </div>
      </div>
      <div className="sidebar__boards">
        {boards &&
          boards.map((board) => (
            <div className={`board__link ${board.id === boardId ? 'current' : ''}`} key={board.id}>
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
    </div>
  );
}
