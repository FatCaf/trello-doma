import React, { useState } from 'react';
import preview from '../assets/preview.png';
import '../styles/AddBoardModal.scss';
import { useAppDispatch } from '../store/hooks';
import { BoardPreviewTile } from '../models/models';
import { addBoard } from '../store/slices/homeSlice';
import { closeModal } from '../store/slices/modalSlice';

export default function AddBoardModal(): JSX.Element {
  const dispatch = useAppDispatch();
  const [previewColor, setPreviewColor] = useState('rgb(205, 90, 145)');
  const [boardName, setBoardName] = useState('');

  const handleClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    const clickedColor = getComputedStyle(event.currentTarget).backgroundColor;

    setPreviewColor(clickedColor);
  };

  const submitHandler = async (event: React.MouseEvent<HTMLFormElement>): Promise<void> => {
    try {
      event.preventDefault();
      const postData: BoardPreviewTile = {
        title: boardName,
        custom: {
          background: previewColor,
        },
      };
      await dispatch(addBoard(postData));
    } catch (e: unknown) {
      const error = e as string;
      throw new Error(error);
    }
  };

  return (
    <div className="wrapper">
      <div className="add__window">
        <div className="cancel" onClick={() => dispatch(closeModal())}>
          <span>X</span>
        </div>
        <div className="preview" style={{ backgroundColor: previewColor }}>
          <img src={preview} alt="preview" />
        </div>
        <div className="properties">
          <p>Виберіть колір</p>
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
          <hr />
          <form onSubmit={submitHandler}>
            <div className="input__block">
              <p>
                <span>*</span> Введіть назву дошки
              </p>
              <input
                className="form__input"
                type="text"
                placeholder="Введіть назву дошки"
                required
                name="title"
                maxLength={16}
                minLength={1}
                onChange={(event) => {
                  setBoardName(event.target.value);
                }}
              />
            </div>
            <button className="add large" type="submit">
              Додати
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
