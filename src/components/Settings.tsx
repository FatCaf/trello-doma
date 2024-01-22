import { memo } from 'react';
import * as React from 'react';
import '../styles/Settings.scss';
import { useParams } from 'react-router';
import { AxiosError } from 'axios';
import { IColorEdit } from '../models/models';
import { editColor } from '../store/slices/bodyColorSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { closeModal } from '../store/slices/modalSlice';
import { fetchBoard } from '../store/slices/boardSlice';

const Settings = memo((): JSX.Element => {
  const dispatch = useAppDispatch();
  const boardId = useParams<{ boardId: string }>();
  const title = useAppSelector((state) => state.board.board.title);

  const handleClick = async (event: React.MouseEvent<HTMLDivElement>): Promise<void> => {
    const clickedColor = getComputedStyle(event.currentTarget).backgroundColor;
    const editData: IColorEdit = {
      boardId,
      data: {
        title,
        custom: {
          background: clickedColor,
        },
      },
    };
    try {
      await dispatch(editColor(editData));
      await dispatch(fetchBoard(boardId));
    } catch (error) {
      const e = error as AxiosError;
      throw new Error(e.message);
    }
  };

  return (
    <div className="settings__window">
      <div className="settings__header">
        <h4>Змінити колір</h4>
        <div className="close" onClick={() => dispatch(closeModal())}>
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
