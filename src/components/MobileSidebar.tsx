import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchBoards } from '../store/slices/homeSlice';
import { closeModal } from '../store/slices/modalSlice';
import BoardPreview from './BoardPreview';
import AddBoardModal from './AddBoardModal';
import addSvg from '../assets/add.svg';
import '../styles/MobileSidebar.scss';
import { handleDelete } from '../common/handlers/handlers';
import { IHandleDelete } from '../models/models';

export default function MobileSidebar(): JSX.Element {
  const dispatch = useAppDispatch();
  const [isHidden, setHidden] = useState(false);
  // const { status } = useAppSelector((state) => state.boards);
  const { boards } = useAppSelector((state) => state.boards);
  const { modals } = useAppSelector((state) => state.modal);
  const [tempClick, setTempClick] = useState(false);

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

  // const handleModalClick = (modal: string | null, event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
  //   event.stopPropagation();
  //   dispatch(openModal({ modalName: modal }));
  // };

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
            onClick={
              () => setTempClick(true)
              // (event) => handleModalClick(event.currentTarget.getAttribute('data-name'), event)
            }
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
      {/* {modals[0]?.modalName === 'add-board' && <AddBoardModal />} */}
      {tempClick && <AddBoardModal />}
    </aside>
  );
}
