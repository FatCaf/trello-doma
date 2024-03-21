import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { fetchBoards } from '../../../../store/slices/homeSlice';
import './BoardSidebar.scss';
import BoardPreview from '../../../../components/BoardPreview';
import addSvg from '../../../../assets/add.svg';
import AddBoardModal from '../../../../components/AddBoardModal';
import { handleDelete } from '../../../../common/handlers/handlers';
import { IHandleDelete } from '../../../../models/models';

export default function BoardSideBar(): JSX.Element {
  const dispatch = useAppDispatch();
  const [isHidden, setHidden] = useState(false);
  const color = useAppSelector((state) => state.board.board.custom.background);
  const { boards } = useAppSelector((state) => state.boards);
  const [addBoardClick, setAddBoardClick] = useState(false);

  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch, color]);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    const props: IHandleDelete = {
      action: 'deleteBoard',
      event,
      dispatch,
      boardId: event.currentTarget.id,
    };
    handleDelete(props);
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
          <div className="sidebar__add" data-name="add-board" onClick={() => setAddBoardClick(!addBoardClick)}>
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
      {addBoardClick && <AddBoardModal onClose={() => setAddBoardClick(!addBoardClick)} />}
    </aside>
  );
}
