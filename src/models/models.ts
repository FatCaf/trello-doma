import { ThunkDispatch, UnknownAction } from '@reduxjs/toolkit';

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

export interface IColumn extends List {}
export interface ICard extends Card {}

export interface IColorEdit {
  boardId: string;
  data: {
    title: string;
    custom: Custom;
  };
}

export interface IBoardEdit {
  boardId: string;
  data: {
    title: string;
    custom: Custom;
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
    position: number;
  };
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
  cardId: string | undefined;
  data: {
    title: string | undefined;
    description: string | undefined;
    list_id: number | undefined;
  };
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
  backgroundColor: string;
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
  itemName: string;
}

export interface IEditedPos {
  id: number;
  position: number;
  list_id?: number;
}

export interface IHandleDelete {
  itemName: string;
  event: React.MouseEvent<HTMLDivElement> | React.FormEvent<HTMLFormElement>;
  dispatch: ThunkDispatch<object, undefined, UnknownAction>;
  boardId: string;
}

export interface IHandleEdit {
  itemName: string;
  event: React.MouseEvent<HTMLDivElement> | React.FormEvent<HTMLFormElement>;
  dispatch: ThunkDispatch<object, undefined, UnknownAction>;
  boardId: string;
  data: object;
}

export interface IHandleAdd {
  itemName: string;
  dispatch: ThunkDispatch<object, undefined, UnknownAction>;
  boardId: string;
  data: object;
  refresh: boolean;
}

export interface ICardAction {
  actionTitle: string;
  actionType: string;
  onClose: () => void;
}
