import { memo } from 'react';
import * as React from 'react';
import './Settings.scss';
import { useParams } from 'react-router';
import { IHandleEdit } from '../../../models/models';
import { useAppDispatch } from '../../../store/hooks';
import { handleEdit } from '../../../common/handlers/handlers';
import { fetchBoard } from '../../../store/slices/boardSlice';

const Settings = memo(({ onClose }: { onClose: () => void }): JSX.Element => {
  const dispatch = useAppDispatch();
  const ids = useParams<{ boardId: string }>();
  const boardId = ids.boardId as string;

  const handleClick = async (event: React.MouseEvent<HTMLDivElement>): Promise<void> => {
    const clickedColor = getComputedStyle(event.currentTarget).backgroundColor;
    const editData = {
      custom: {
        background: clickedColor,
      },
    };
    const props: IHandleEdit = {
      action: 'editBoardColor',
      boardId,
      dispatch,
      event,
      data: editData,
    };
    await handleEdit(props);
    await dispatch(fetchBoard(boardId));
  };

  return (
    <div className="settings__window">
      <div className="settings__header">
        <h4>Змінити колір</h4>
        <div className="close" onClick={onClose}>
          <div>X</div>
        </div>
      </div>
      <hr />
      <div className="color__grid">
        <div className="color__cell" style={{ backgroundColor: '#0079bf' }} onClick={handleClick} />
        <div className="color__cell" style={{ backgroundColor: '#d29034' }} onClick={handleClick} />
        <div className="color__cell" style={{ backgroundColor: '#519839' }} onClick={handleClick} />
        <div className="color__cell" style={{ backgroundColor: '#b05632' }} onClick={handleClick} />
        <div className="color__cell" style={{ backgroundColor: '#89609e' }} onClick={handleClick} />
        <div className="color__cell" style={{ backgroundColor: '#cd5a91' }} onClick={handleClick} />
        <div className="color__cell" style={{ backgroundColor: '#4bbf6b' }} onClick={handleClick} />
        <div className="color__cell" style={{ backgroundColor: '#00aecc' }} onClick={handleClick} />
        <div className="color__cell" style={{ backgroundColor: '#838c91' }} onClick={handleClick} />
        <div className="color__cell" style={{ backgroundColor: '#ffa07a' }} onClick={handleClick} />
      </div>
    </div>
  );
});

export default Settings;
