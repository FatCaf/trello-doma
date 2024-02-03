import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchBoards } from '../store/slices/homeSlice';
import '../styles/BoardSidebar.scss';
import BoardPreview from './BoardPreview';
import { openModal } from '../store/slices/modalSlice';
import addSvg from '../assets/add.svg';
import AddBoardModal from './AddBoardModal';
import { handleDelete } from '../common/handlers/handlers';
import { IHandleDelete } from '../models/models';

export default function BoardSideBar(): JSX.Element {
  const dispatch = useAppDispatch();
  const [isHidden, setHidden] = useState(false);
  const color = useAppSelector((state) => state.bodyColor.color);
  const { boards } = useAppSelector((state) => state.boards);
  const { modals } = useAppSelector((state) => state.modal);

  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch, color]);

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
    <aside className={`sidebar ${isHidden ? 'hidden' : 'showed'}`}>
      <div
        className="hide"
        onClick={() => {
          if (isHidden) setHidden(!isHidden);
          setHidden(!isHidden);
        }}
        style={isHidden ? { right: '0' } : {}}
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
              <div className="board__delete" id={`${board.id}`} data-name={board.title} onClick={handleClick}>
                <span>X</span>
              </div>
            </div>
          ))}
      </div>
      {modals[0]?.modalName === 'add-board' && <AddBoardModal />}
    </aside>
  );
}
