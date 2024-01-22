/* eslint-disable no-console */
import { useState } from 'react';
import * as React from 'react';
import { useParams } from 'react-router';
import { confirmAlert } from 'react-confirm-alert';
import Card from './Card';
import '../styles/BoardColumn.scss';
import { IBoardColumn, IColumnCardPost, IColumnDelete, IColumnEdit } from '../models/models';
import { addCard } from '../store/slices/cardSlice';
import { useAppDispatch } from '../store/hooks';
import { deleteColumn, editColumn, fetchBoard } from '../store/slices/boardSlice';
import InputField from './InputField';
// import { dragStarted, setDraggingData } from '../store/slices/dragNdropSlice';

export default function BoardColumn({ id, title, cards }: IBoardColumn): JSX.Element {
  const boardId = useParams<{ boardId: string }>();
  const dispatch = useAppDispatch();
  const [isColumnTitleClicked, setColumnTitleClicked] = useState(false);
  const [isCardAddClicked, setCardAddClicked] = useState(false);
  const [cardTitle, setCardTitle] = useState('Безіменна картка');
  const [columnTitle, setColumnTitle] = useState('Безіменна колонка');
  // const { lists } = useAppSelector((state) => state.board.board);
  // const elementData = useAppSelector((state) => state.dnd.elementData);

  const handleAdd = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    const listId = +event.currentTarget.id;
    try {
      event.preventDefault();
      const postData: IColumnCardPost = {
        boardId,
        data: {
          title: cardTitle,
          list_id: listId,
          position: cards.length ? cards.length + 1 : 1,
          description: '',
          custom: {
            deadline: '',
          },
        },
      };
      await dispatch(addCard(postData));
      await dispatch(fetchBoard(boardId));
    } catch (e: unknown) {
      const error = e as string;
      throw new Error(error);
    }
  };

  const handleDelete = (event: React.MouseEvent<HTMLDivElement>): void => {
    const name = event.currentTarget.getAttribute('data-name');
    const listId = event.currentTarget.getAttribute('id') as string;
    const deleteData: IColumnDelete = {
      boardId,
      listId,
    };

    confirmAlert({
      title: 'Видалити колонку',
      message: `Чи точно ви хочете видалити колонку ${name} ?`,
      buttons: [
        {
          label: 'Так',
          onClick: async (): Promise<void> => {
            try {
              await dispatch(deleteColumn(deleteData));
              await dispatch(fetchBoard(boardId));
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

  const handleEdit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    const listId = event.currentTarget.id;
    try {
      event.preventDefault();
      const editData: IColumnEdit = {
        boardId,
        listId,
        data: {
          title: columnTitle,
          position: 1,
        },
      };
      await dispatch(editColumn(editData));
      setColumnTitleClicked(false);
      await dispatch(fetchBoard(boardId));
    } catch (e: unknown) {
      const error = e as string;
      throw new Error(error);
    }
  };

  const handleInputSubmit = async (event: React.FormEvent<HTMLFormElement>, actionType: string): Promise<void> => {
    event.preventDefault();
    if (actionType === 'add') {
      await handleAdd(event);
    } else if (actionType === 'edit') {
      await handleEdit(event);
    }
  };

  // const dropHandler = async (e: React.DragEvent): Promise<void> => {
  //   console.log(lists);
  //   console.log(elementData);
  //   const { id, title, description, custom } = JSON.parse(elementData);

  //   const deleteData: IColumnCardDelete = {
  //     boardId,
  //     cardId: id,
  //   };

  //   const postData: IColumnCardPost = {
  //     boardId,
  //     data: {
  //       title,
  //       list_id: +e.currentTarget.id,
  //       position: cards.length ? cards.length + 1 : 1,
  //       description,
  //       custom,
  //     },
  //   };
  //   await dispatch(deleteCard(deleteData));
  //   await dispatch(addCard(postData));
  //   await dispatch(fetchBoard(boardId));
  //   console.log(lists);
  // };

  const overHandler = (e: React.DragEvent): void => {
    e.preventDefault();
  };

  //   const mainContent = document.querySelector('.column__cards') as Element;
  //   const parentCoord = mainContent.getBoundingClientRect();

  //   const isOutsideX =
  //     movingElement.clientX < parentCoord.x || movingElement.clientX + width > parentCoord.x + parentCoord.width;

  //   const isOutsideY =
  //     movingElement.clientY < parentCoord.y || movingElement.clientY + height > parentCoord.y + parentCoord.height;
  // }, [height, movingElement.clientX, movingElement.clientY, width]);

  // useEffect(() => {
  //   movingElement.movingElement?.addEventListener('drag', handleDrag);

  //   return () => {
  //     movingElement.movingElement?.removeEventListener('drag', handleDrag);
  //   };
  // }, [handleDrag, movingElement]);

  return (
    <div
      className="column"
      id={`${id}`}
      key={id}
      draggable
      // onDragStart={(e: React.DragEvent) => dragStartHandler(e)}
      onDragOver={(e: React.DragEvent<HTMLDivElement>) => overHandler(e)}
      // onDrop={(e: React.DragEvent) => dropHandler(e)}
    >
      <div className="column__header">
        <div className="column__title">
          {isColumnTitleClicked ? (
            <InputField
              id={id}
              buttonText="Змінити"
              placeholder="Введіть назву колонки"
              onChange={setColumnTitle}
              onSubmit={handleInputSubmit}
              onClose={() => setColumnTitleClicked(false)}
              actionType="edit"
            />
          ) : (
            <h4 onClick={() => setColumnTitleClicked(true)}>{title}</h4>
          )}
        </div>
        <div
          className="column__delete"
          id={`${id}`}
          data-name={title}
          onClick={handleDelete}
          style={isColumnTitleClicked ? { display: 'none' } : {}}
        >
          <div>X</div>
        </div>
      </div>
      <div className="column__cards">
        <div className="drop__zone">
          {cards &&
            [...cards]
              .sort((cur, next) => cur.position - next.position)
              .map((card) => <Card {...card} key={card.id} />)}
        </div>
        <div className="add__card">
          {isCardAddClicked ? (
            <InputField
              id={id}
              placeholder="Введіть назву картки"
              buttonText="Додати"
              onChange={setCardTitle}
              onSubmit={handleInputSubmit}
              onClose={() => setCardAddClicked(false)}
              actionType="add"
            />
          ) : (
            <p onClick={() => setCardAddClicked(true)}>
              <span>+</span> Додати нову картку
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
