/* eslint-disable no-restricted-globals */

import { confirmAlert } from 'react-confirm-alert';
import {
  IBoardEdit,
  IBoardPost,
  ICardDelete,
  ICardEdit,
  ICardEditPos,
  ICardPost,
  IColumnDelete,
  IColumnEdit,
  IColumnEditPos,
  IColumnPost,
  IHandleAdd,
  IHandleDelete,
  IHandleEdit,
} from '../../models/models';
import { addBoard, deleteBoard, fetchBoards } from '../../store/slices/homeSlice';
import { addCard, deleteCard, editCard } from '../../store/slices/cardSlice';
import {
  addColumn,
  deleteColumn,
  editBoard,
  editCardsPosition,
  editColumn,
  editColumnsPosition,
  fetchBoard,
} from '../../store/slices/boardSlice';

export const handleDelete = async (props: IHandleDelete): Promise<void> => {
  const { action, event, dispatch, boardId } = props;
  const name = event.currentTarget.getAttribute('data-name');
  const id = String(event.currentTarget.getAttribute('id'));
  let title = '';
  let message = '';
  let func: () => Promise<void> = async () => {};
  let deleteData: object;

  switch (action) {
    case 'deleteBoard':
      title = 'Видалити дошку';
      message = `Чи точно ви хочете видалити дошку ${name} ?`;
      func = async (): Promise<void> => {
        try {
          await dispatch(deleteBoard(boardId));
          await dispatch(fetchBoard(boardId));
        } catch (e: unknown) {
          const error = e as string;
          throw new Error(error);
        }
      };
      break;

    case 'deleteColumn':
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

    case 'deleteCard':
      title = 'Видалити картку';
      message = `Чи точно ви хочете видалити картку ${name} ?`;
      deleteData = {
        boardId,
        cardId: id,
      };
      func = async (): Promise<void> => {
        try {
          await dispatch(deleteCard(deleteData as ICardDelete));
          window.location.href = `/board/${boardId}`;
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
      },
    ],
  });
};

export const handleEdit = async (props: IHandleEdit): Promise<void> => {
  const { action, event, dispatch, boardId, data } = props;
  const id = event?.currentTarget.id;
  let func: () => Promise<void> = async () => {};
  let editData: object;

  switch (action) {
    case 'editColumnTitle':
      editData = {
        boardId,
        listId: id,
        data,
      };
      func = async (): Promise<void> => {
        try {
          event?.preventDefault();
          await dispatch(editColumn(editData as IColumnEdit));
          await dispatch(fetchBoard(boardId));
        } catch (e: unknown) {
          const error = e as string;
          throw new Error(error);
        }
      };
      break;
    case 'editColumnsPosition':
      editData = {
        boardId,
        data,
      };
      func = async (): Promise<void> => {
        try {
          await dispatch(editColumnsPosition(editData as IColumnEditPos));
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
          await dispatch(editBoard(editData as IBoardEdit));
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
          event?.preventDefault();
          await dispatch(editCard(editData as ICardEdit));
          await dispatch(fetchBoard(boardId));
        } catch (e: unknown) {
          const error = e as string;
          throw new Error(error);
        }
      };
      break;
    case 'editCardsPosition':
      editData = {
        boardId,
        data,
      };
      func = async (): Promise<void> => {
        try {
          await dispatch(editCardsPosition(editData as ICardEditPos));
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
  const { action, dispatch, boardId, data } = props;
  let func: () => Promise<void> = async () => {};
  let postData: object;

  switch (action) {
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
      };
      break;
    default:
      break;
  }

  await func();
};
