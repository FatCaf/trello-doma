import React from 'react';
import '../styles/Settings.scss';
import { useDispatch } from 'react-redux';
import { ISettings } from '../models/models';
import { setBodyColor } from '../store/slices/bodyColorSlice';

export default function Settings({ closeModal }: ISettings): JSX.Element {
  const dispatch = useDispatch();

  const handleClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    const clickedColor = getComputedStyle(event.currentTarget).backgroundColor;
    dispatch(setBodyColor(clickedColor));
  };

  return (
    <div className="settings__window">
      <div className="settings__header">
        <h4>Змінити колір</h4>
        <div className="cancel" onClick={closeModal}>
          <span>X</span>
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
}
