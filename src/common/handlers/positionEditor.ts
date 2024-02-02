import { ICard, IColumn, IEditPos, IEditedPos } from '../../models/models';

function extractCardsFromList(elementsArray: Array<IColumn>, elementId: number): Array<ICard> {
  const cardsInList: Array<ICard> = [];

  const foundList = elementsArray.find((list) => list.cards.some((card) => card.id === elementId));

  if (foundList) {
    cardsInList.push(...foundList.cards);
  }
  return cardsInList;
}

function extractMovedElement(elementsArray: Array<IColumn>, elementId: number): ICard | IColumn | undefined {
  const cardsInList: Array<ICard> = extractCardsFromList(elementsArray, elementId);

  const movedElement =
    cardsInList.length > 0
      ? cardsInList.find((element) => element.id === elementId)
      : elementsArray.find((element) => element.id === elementId);
  if (movedElement) return movedElement;

  return undefined;
}

function extractFilteredElements(elementsArray: Array<IColumn>, elementId: number): Array<ICard | IColumn> {
  const cardsInList: Array<ICard> = extractCardsFromList(elementsArray, elementId);
  const filteredElements =
    cardsInList.length > 0
      ? cardsInList.filter((element) => element.id !== elementId)
      : elementsArray.filter((element) => element.id !== elementId);

  return filteredElements;
}

function extractNecessaryData({ elementId, elementsArray, itemName }: IEditPos): Array<IEditedPos> {
  const resultArray: Array<IEditedPos> = [];

  const foundList = elementsArray.find((list) => list.cards.some((card) => card.id === elementId));

  const filteredElements = extractFilteredElements(elementsArray, elementId);

  filteredElements.forEach((element) => {
    const newList: IEditedPos = {
      id: element.id,
      position: element.position,
    };

    if (itemName === 'card') newList.list_id = foundList?.id;
    resultArray.push(newList);
  });

  return resultArray;
}

export default function editPosition({ elementId, elementsArray, itemName }: IEditPos): Array<IEditedPos> {
  const resultArray: Array<IEditedPos> = extractNecessaryData({ elementId, elementsArray, itemName });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const movedElement: any = extractMovedElement(elementsArray, elementId);

  if (movedElement && elementsArray.indexOf(movedElement) === 0) {
    resultArray.forEach((curr) => {
      // eslint-disable-next-line no-param-reassign
      curr.position -= 1;
    });
  } else {
    resultArray.forEach((curr, index, array) => {
      if (index + 1 < array.length) {
        const next = array[index + 1];

        if (next.position > curr.position + 1) next.position -= 1;
      }
    });
  }

  return resultArray;
}
