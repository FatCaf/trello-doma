type Card = {
  id?: number;
  title?: string;
  list_id?: number;
  position?: number;
  description?: string;
  custom?: unknown;
};

type List = {
  id?: number;
  title?: string;
  position?: number;
  cards?: Card[];
};

type Custom = {
  background: string;
};

export type BoardPreviewTile = {
  id?: number;
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
  boardId: string | undefined;
  data: {
    title: string;
    custom: Custom;
  };
}

export interface IBoardEdit {
  boardId: string | undefined;
  data: {
    title: string;
    custom: Custom;
  };
}

export interface IColumnPost {
  boardId: string | undefined;
  data: IBoardColumn;
}

export interface IColumnDelete {
  boardId: string | undefined;
  listId: string | null;
}

export interface IColumnEdit {
  boardId: string | undefined;
  listId: string | null;
  data: {
    title: string;
    position: number;
  };
}

export interface IColumnCardPost {
  boardId: string | undefined;
  data: IColumnCard;
}

export interface IColumnCardDelete {
  boardId: string | undefined;
  cardId: string | null;
}
