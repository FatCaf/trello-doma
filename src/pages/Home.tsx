import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { confirmAlert } from 'react-confirm-alert';
import '../styles/Home.scss';
import { Link } from 'react-router-dom';
import { AxiosError } from 'axios';
import instance from '../api/requests';
import BoardPreview from '../components/BoardPreview';
import AddBoardModal from '../components/AddBoardModal';
import { IResponse } from '../models/models';

export default function Home(): JSX.Element {
  const [boards, setItems] = useState<IResponse>();
  const [isAddClicked, setAddClicked] = useState(false);

  const addHandler = async (): Promise<void> => {
    setAddClicked(true);
  };

  async function fetchBoards(): Promise<void> {
    try {
      const response: IResponse = await instance.get(`/board`);
      setItems(response);
    } catch (e: unknown) {
      const error = e as AxiosError;
      throw new Error(error.message);
    }
  }

  async function deleteBoard(boardId: string | null, update: () => void): Promise<void> {
    try {
      await instance.delete(`/board/${boardId}`);
      update();
    } catch (e: unknown) {
      const error = e as AxiosError;
      throw new Error(error.message);
    }
  }

  useEffect(() => {
    fetchBoards();
  }, []);

  const handleChanges = async (): Promise<void> => {
    await fetchBoards();
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    const key = event.currentTarget.getAttribute('data-name');
    const boardId = event.currentTarget.getAttribute('id');
    confirmAlert({
      title: 'Видалити дошку',
      message: `Чи точно ви хочете видалити дошку ${key}`,
      buttons: [
        {
          label: 'Так',
          onClick: async (): Promise<void> => {
            try {
              await deleteBoard(boardId, handleChanges);
            } catch (e: unknown) {
              const error = e as string;
              throw new Error(error);
            }
          },
        },
        {
          label: 'Ні',
          // eslint-disable-next-line no-console
          onClick: () => console.log('no delete'),
        },
      ],
    });
  };

  return (
    <div className="home">
      <div className="board__grid">
        {boards?.boards.map((board) => (
          <div className="board__link" key={board?.id}>
            <Link to={`/board/${board?.id}`} key={board?.id}>
              <BoardPreview {...board} key={board?.id} />
            </Link>
            <div className="board__delete" id={`${board?.id}`} data-name={board?.title} onClick={handleClick}>
              <span>X</span>
            </div>
          </div>
        ))}
        <div className="add__board" onClick={addHandler}>
          <p>
            <span>+</span> Додати нову дошку
          </p>
        </div>
      </div>
      {isAddClicked && <AddBoardModal closeModal={() => setAddClicked(false)} onBoardAdded={handleChanges} />}
    </div>
  );
}
