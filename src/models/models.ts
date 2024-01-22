import { Params } from 'react-router';

export type Card = {
  id: number;
  title?: string;
  list_id: number;
  position: number;
  description?: string;
  custom?: unknown;
};

export type List = {
  id: number;
  title?: string;
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
  users: User[];
  lists: List[];
}

export interface IBoardColumn extends List {}
export interface IColumnCard extends Card {}

export interface IColorEdit {
  boardId: Readonly<Params<string>>;
  data: {
    title: string;
    custom: Custom;
  };
}

export interface IBoardEdit {
  boardId: Readonly<Params<string>>;
  data: {
    title: string;
    custom: Custom;
  };
}

export interface IColumnPost {
  boardId: Readonly<Params<string>>;
  data: {
    title: string;
    position: number;
  };
}

export interface IColumnDelete {
  boardId: Readonly<Params<string>>;
  listId: string;
}

export interface IColumnEdit {
  boardId: Readonly<Params<string>>;
  listId: string;
  data: {
    title: string;
    position: number;
  };
}

export interface IColumnCardPost {
  boardId: Readonly<Params<string>>;
  data: {
    title: string;
    list_id: number;
    position: number;
    description: string;
    custom: unknown;
  };
}

export interface IColumnCardDelete {
  boardId: Readonly<Params<string>>;
  cardId: string;
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

export interface IChangePos {
  boardId: Readonly<Params<string>>;
  listId: string;
  data: {
    position: number;
  };
}
