/* eslint-disable import/no-extraneous-dependencies */
import { ThunkDispatch, UnknownAction } from '@reduxjs/toolkit';
import { DraggableProvided } from 'react-beautiful-dnd';

export type Card = {
  id: number;
  title: string;
  list_id: number;
  position: number;
  description: string;
  users: User[];
  custom?: unknown;
};

export type List = {
  id: number;
  title: string;
  position: number;
  cards: Card[];
};

type Custom = {
  background: string;
};

export type BoardPreviewTile = {
  id: number;
  title: string;
  custom: Custom;
};

type User = {
  id: number;
  username: string;
};

export interface IBoard {
  title: string;
  custom: Custom;
  lists: List[];
}

export interface IColumn extends List {
  provided?: DraggableProvided;
}
export interface ICard extends Card {
  provided?: DraggableProvided;
}

export interface IBoardEdit {
  boardId: string;
  data: {
    title?: string;
    custom?: Custom;
  };
}

export interface IBoardPost {
  data: {
    title: string;
    custom: Custom;
  };
}

export interface IColumnPost {
  boardId: string;
  data: {
    title: string;
    position: number;
  };
}

export interface IColumnDelete {
  boardId: string;
  listId: string;
}

export interface IColumnEdit {
  boardId: string;
  listId: string;
  data: {
    title: string;
  };
}

export interface IColumnEditPos {
  boardId: string;
  data: IEditedPos[];
}

export interface ICardPost {
  boardId: string;
  data: {
    title: string;
    list_id: number;
    position: number;
    description: string;
    custom: unknown;
  };
}

export interface ICardDelete {
  boardId: string;
  cardId: string;
}

export interface ICardEdit {
  boardId: string;
  cardId: string;
  data: {
    title?: string;
    description?: string;
    list_id: number;
  };
}

export interface ICardEditPos {
  boardId: string;
  cardId: string;
  data: IEditedPos[];
}

export interface IInputField {
  id?: number;
  placeholder: string;
  buttonText: string;
  onChange: (params: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>, actionType: string) => void;
  onClose: () => void;
  actionType: string;
}

export interface IBoardHeader {
  boardTitle: string;
  onOpen: () => void;
}

export interface ISlot {
  width: number;
  height: number;
}

export interface IMovingElement {
  movingElement: HTMLDivElement | null;
  clientX: number;
  clientY: number;
}

export interface IEditPos {
  elementId: number;
  elementsArray: Array<IColumn>;
  itemName?: string;
  destPos?: number;
  sourcePos?: number;
}

export interface IEditedPos {
  id: number;
  position: number;
  list_id?: number;
}

export interface IHandleDelete {
  action: string;
  event: React.MouseEvent<HTMLDivElement> | React.FormEvent<HTMLFormElement>;
  dispatch: ThunkDispatch<object, undefined, UnknownAction>;
  boardId: string;
}

export interface IHandleEdit {
  action: string;
  event?: React.MouseEvent<HTMLDivElement> | React.FormEvent<HTMLFormElement>;
  cardId?: number;
  dispatch: ThunkDispatch<object, undefined, UnknownAction>;
  boardId: string;
  data: object;
}

export interface IHandleAdd {
  action: string;
  dispatch: ThunkDispatch<object, undefined, UnknownAction>;
  boardId: string;
  data: object;
}

export interface ICardAction {
  actionTitle: string;
  actionType: string;
  listId: number;
  cardId: string;
  onClose: () => void;
}

export interface ISelectForm {
  actionType: string;
  listId: number;
  cardId: string;
}

export interface AuthResponse {
  result: string;
  token: string;
  refreshToken: string;
}

export interface SignUpResponse {
  result: string;
  id: number;
}
