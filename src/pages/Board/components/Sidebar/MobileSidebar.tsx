import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { fetchBoards } from '../../../../store/slices/homeSlice';
import BoardPreview from '../../../../components/BoardPreview';
import AddBoardModal from '../../../../components/AddBoardModal';
import addSvg from '../../../../assets/add.svg';
import './MobileSidebar.scss';
import { handleDelete } from '../../../../common/handlers/handlers';
import { IHandleDelete } from '../../../../models/models';

export default function MobileSidebar({ onClose, isHidden }: { onClose: () => void; isHidden: boolean }): JSX.Element {
  const dispatch = useAppDispatch();
  const { boards } = useAppSelector((state) => state.boards);
  const [addBoardClick, setAddBoardClick] = useState(false);

  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    const props: IHandleDelete = {
      action: 'addBoard',
      event,
      dispatch,
      boardId: event.currentTarget.id,
    };
    handleDelete(props);
  };

  return (
    <aside className={`sidebar ${isHidden ? 'showed' : 'hidden'} onboard`}>
      <div
        className="hide onsidebar"
        onClick={() => {
          onClose();
        }}
      >
        <div className="arrow" style={{ borderBottom: '2px solid #f1f2f4', borderLeft: '2px solid #f1f2f4' }} />
      </div>
      <div className="sidebar__header">
        <div className="header__wrapper">
          <div className="sidebar__title">
            <h2>Мої дошки</h2>
          </div>
          <div className="sidebar__add" data-name="add-board" onClick={() => setAddBoardClick(true)}>
            <img src={addSvg} alt="Додати" />
          </div>
        </div>
      </div>
      <div className="sidebar__boards">
        {boards &&
          boards.map((board) => (
            <div className="board__link" key={board.id}>
              <Link to={`/board/${board.id}`} key={board.id}>
                <BoardPreview {...board} key={board.id} />
              </Link>
              <div className="board__delete" id={`${board.id}`} data-name={board.title} onClick={handleClick}>
                <span>X</span>
              </div>
            </div>
          ))}
      </div>
      {addBoardClick && <AddBoardModal onClose={() => setAddBoardClick(!addBoardClick)} />}
    </aside>
  );
}
