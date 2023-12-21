type Card = {
  id: number;
  title: string;
};

type List = {
  id: number;
  title: string;
  cards: Card[];
};

export interface IBoard {
  title: string;
  lists: List[];
}

export interface IBoardColumn extends List {}
export interface IColumnCard extends Card {}

export interface ISettings {
  closeModal: () => void;
  changeBodyColor: (color: string) => void;
}
