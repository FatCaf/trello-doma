type Card = {
  id: number;
  title: string;
};

type List = {
  id?: number;
  title?: string;
  cards?: Card[];
};

type Custom = {
  background: string;
};

export type BoardPreviewTile = {
  id?: number;
  title?: string;
  custom?: Custom;
};

type User = {
  id: number;
  username: string;
};

export interface IBoard {
  title?: string;
  custom?: {
    description: string;
  };
  users: [User?];
  lists: [List?];
}

export interface IBoardColumn extends List {}
export interface IColumnCard extends Card {}

export interface ISettings {
  closeModal: () => void;
  onBoardAdded: () => void;
}

export interface IResponse {
  boards: [BoardPreviewTile?];
}
