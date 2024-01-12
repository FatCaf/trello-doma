import { useState } from 'react';
import { useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import InputField from './InputField';
import { editBoard, fetchBoard } from '../store/slices/boardSlice';
import { IBoardEdit, IBoardHeader } from '../models/models';
import { openModal } from '../store/slices/modalSlice';

export default function BoardHeader({ boardTitle, backgroundColor }: IBoardHeader): JSX.Element {
  const dispatch = useAppDispatch();
  const [isHidden, setHidden] = useState(false);
  const [title, setTitle] = useState('Безіменна дошка');
  const { modals } = useAppSelector((state) => state.modal);
  const [isTitleClicked, setTitleClicked] = useState(false);
  const { boardId } = useParams<{ boardId: string }>();

  const handleEdit = async (): Promise<void> => {
    try {
      const editData: IBoardEdit = {
        boardId,
        data: {
          title,
          custom: {
            background: backgroundColor,
          },
        },
      };
      await dispatch(editBoard(editData));
      setTitleClicked(false);
      await dispatch(fetchBoard(boardId));
    } catch (e: unknown) {
      const error = e as string;
      throw new Error(error);
    }
  };

  const handleInputSubmit = async (event: React.FormEvent<HTMLFormElement>, actionType: string): Promise<void> => {
    event.preventDefault();
    if (actionType === 'edit') await handleEdit();
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
        <div>
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
