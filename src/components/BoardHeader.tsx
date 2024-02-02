import { useState } from 'react';
import { useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import InputField from './InputField';
import { IBoardHeader, IHandleEdit } from '../models/models';
import { openModal } from '../store/slices/modalSlice';
import '../styles/BoardHeader.scss';
import { handleEdit } from '../common/handlers/handlers';

export default function BoardHeader({ boardTitle, backgroundColor }: IBoardHeader): JSX.Element {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState('Безіменна дошка');
  const { modals } = useAppSelector((state) => state.modal);
  const [isTitleClicked, setTitleClicked] = useState(false);
  const ids = useParams<{ boardId: string }>();
  const boardId = ids.boardId as string;

  const handleInputSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const editData = {
      title,
      custom: {
        background: backgroundColor,
      },
    };
    const props: IHandleEdit = {
      itemName: 'editBoardTitle',
      boardId,
      dispatch,
      event,
      data: editData,
    };
    await handleEdit(props);
  };

  const handleModalClick = (modal: string | null, event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    event.stopPropagation();
    dispatch(openModal({ modalName: modal }));
  };

  return (
    <div className="board__header">
      <div className="container-head-board">
        <div
          className="hide onboard"
          data-name="mobile-sidebar"
          onClick={(event) => handleModalClick(event.currentTarget.getAttribute('data-name'), event)}
        >
          <div className="arrow" style={{ borderTop: '2px solid #f1f2f4', borderRight: '2px solid #f1f2f4' }} />
        </div>
        <div className="board__name">
          {isTitleClicked ? (
            <InputField
              buttonText="Змінити"
              placeholder="Введіть назву дошки"
              onChange={setTitle}
              onSubmit={handleInputSubmit}
              onClose={() => setTitleClicked(false)}
              actionType="edit"
            />
          ) : (
            <h2
              onClick={() => {
                setTitleClicked(true);
              }}
            >
              {boardTitle}
            </h2>
          )}
        </div>
        <div
          data-name="settings"
          className="settings"
          onClick={(event) => handleModalClick(event.currentTarget.getAttribute('data-name'), event)}
        >
          <div className={`bars ${modals[0]?.modalName === 'settings' ? 'active' : ''}`}>
            <div className="top bar" />
            <div className="mid bar" />
            <div className="bottom bar" />
          </div>
        </div>
      </div>
    </div>
  );
}
