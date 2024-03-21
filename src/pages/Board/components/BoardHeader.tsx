import { useState } from 'react';
import { useParams } from 'react-router';
import { useAppDispatch } from '../../../store/hooks';
import InputField from '../../../components/InputField';
import { IBoardHeader, IHandleEdit } from '../../../models/models';
import './BoardHeader.scss';
import { handleEdit } from '../../../common/handlers/handlers';
import Settings from './Settings';

export default function BoardHeader({ boardTitle, onOpen }: IBoardHeader): JSX.Element {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState('Безіменна дошка');
  const [isTitleClicked, setTitleClicked] = useState(false);
  const ids = useParams<{ boardId: string }>();
  const boardId = ids.boardId as string;
  const [settingsClicked, setSettignsClicked] = useState(false);

  const handleInputSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const editData = {
      title,
    };
    const props: IHandleEdit = {
      action: 'editBoardTitle',
      boardId,
      dispatch,
      event,
      data: editData,
    };
    await handleEdit(props);
  };

  return (
    <div className="board__header">
      <div className="container-head-board">
        <div className="hide onboard" data-name="mobile-sidebar" onClick={onOpen}>
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
        <div data-name="settings" className="settings" onClick={() => setSettignsClicked(!settingsClicked)}>
          <div className={`bars ${settingsClicked ? 'active' : ''}`}>
            <div className="top bar" />
            <div className="mid bar" />
            <div className="bottom bar" />
          </div>
        </div>
        {settingsClicked && <Settings onClose={() => setSettignsClicked(!settingsClicked)} />}
      </div>
    </div>
  );
}
