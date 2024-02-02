/* eslint-disable no-restricted-globals */

import { confirmAlert } from 'react-confirm-alert';
import {
  IBoardEdit,
  IBoardPost,
  ICardDelete,
  ICardEdit,
  ICardPost,
  IColorEdit,
  IColumnDelete,
  IColumnEdit,
  IColumnPost,
  IHandleAdd,
  IHandleDelete,
  IHandleEdit,
} from '../../models/models';
import { addBoard, deleteBoard, fetchBoards } from '../../store/slices/homeSlice';
import { addCard, deleteCard, editCard } from '../../store/slices/cardSlice';
import { addColumn, deleteColumn, editBoard, editColumn, fetchBoard } from '../../store/slices/boardSlice';
import { editColor } from '../../store/slices/bodyColorSlice';
import { closeModal } from '../../store/slices/modalSlice';

export const handleDelete = async (props: IHandleDelete): Promise<void> => {
  const { itemName, event, dispatch, boardId } = props;
  const name = event.currentTarget.getAttribute('data-name');
  const id = String(event.currentTarget.getAttribute('id'));
  let title = '';
  let message = '';
  let func: () => Promise<void> = async () => {};
  let deleteData: object;

  switch (itemName) {
    case 'board':
      title = 'Видалити дошку';
      message = `Чи точно ви хочете видалити дошку ${name} ?`;
      func = async (): Promise<void> => {
        try {
          await dispatch(deleteBoard(boardId));
          await dispatch(fetchBoards());
        } catch (e: unknown) {
          const error = e as string;
          throw new Error(error);
        }
      };
      break;

    case 'column':
      title = 'Видалити колонку';
      message = `Чи точно ви хочете видалити колонку ${name} ?`;
      deleteData = {
        boardId,
        listId: id,
      };

      func = async (): Promise<void> => {
        try {
          await dispatch(deleteColumn(deleteData as IColumnDelete));
          await dispatch(fetchBoard(boardId));
        } catch (e: unknown) {
          const error = e as string;
          throw new Error(error);
        }
      };
      break;

    case 'card':
      title = 'Видалити картку';
      message = `Чи точно ви хочете видалити картку ${name} ?`;
      deleteData = {
        boardId,
        cardId: id,
      };
      func = async (): Promise<void> => {
        try {
          await dispatch(deleteCard(deleteData as ICardDelete));
          dispatch(closeModal());
          await dispatch(fetchBoard(boardId));
        } catch (e: unknown) {
          const error = e as string;
          throw new Error(error);
        }
      };
      break;
    default:
      break;
  }

  confirmAlert({
    title,
    message,
    buttons: [
      {
        label: 'Так',
        onClick: func,
      },
      {
        label: 'Ні',
        // eslint-disable-next-line no-console
        onClick: () => console.log('no delete'),
      },
    ],
  });
};

export const handleEdit = async (props: IHandleEdit): Promise<void> => {
  const { itemName, event, dispatch, boardId, data } = props;
  const { id } = event.currentTarget;
  let func: () => Promise<void> = async () => {};
  let editData: object;

  switch (itemName) {
    case 'editColumnTitle':
      editData = {
        boardId,
        listId: id,
        data,
      };
      func = async (): Promise<void> => {
        try {
          event.preventDefault();
          await dispatch(editColumn(editData as IColumnEdit));
          await dispatch(fetchBoard(boardId));
        } catch (e: unknown) {
          const error = e as string;
          throw new Error(error);
        }
      };
      break;
    case 'editBoardTitle':
      editData = {
        boardId,
        data,
      };
      func = async (): Promise<void> => {
        try {
          await dispatch(editBoard(editData as IBoardEdit));
          await dispatch(fetchBoard(boardId));
        } catch (e: unknown) {
          const error = e as string;
          throw new Error(error);
        }
      };
      break;
    case 'editBoardColor':
      editData = {
        boardId,
        data,
      };
      func = async (): Promise<void> => {
        try {
          await dispatch(editColor(editData as IColorEdit));
          await dispatch(fetchBoard(boardId));
        } catch (error) {
          const e = error as string;
          throw new Error(e);
        }
      };
      break;
    case 'editCard':
      editData = {
        boardId,
        cardId: id,
        data,
      };
      func = async (): Promise<void> => {
        try {
          event.preventDefault();
          await dispatch(editCard(editData as ICardEdit));
          await dispatch(fetchBoard(boardId));
        } catch (e: unknown) {
          const error = e as string;
          throw new Error(error);
        }
      };
      break;
    default:
      break;
  }

  await func();
};

export const handleAdd = async (props: IHandleAdd): Promise<void> => {
  const { itemName, dispatch, boardId, data, refresh } = props;
  let func: () => Promise<void> = async () => {};
  let postData: object;

  switch (itemName) {
    case 'addBoard':
      postData = {
        data,
      };
      func = async (): Promise<void> => {
        await dispatch(addBoard(postData as IBoardPost));
        await dispatch(fetchBoards());
      };
      break;
    case 'addColumn':
      postData = {
        boardId,
        data,
      };
      func = async (): Promise<void> => {
        await dispatch(addColumn(postData as IColumnPost));
        await dispatch(fetchBoard(boardId));
      };
      break;

    case 'addCard':
      postData = {
        boardId,
        data,
      };
      func = async (): Promise<void> => {
        await dispatch(addCard(postData as ICardPost));
        if (refresh) await dispatch(fetchBoard(boardId));
      };
      break;
    default:
      break;
  }

  await func();
};
