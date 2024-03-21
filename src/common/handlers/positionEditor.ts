/* eslint-disable no-param-reassign */
import { ICard, IColumn, IEditPos, IEditedPos } from '../../models/models';

export function extractCardsFromList(elementsArray: Array<IColumn>, elementId: number): Array<ICard> {
  const cardsInList: Array<ICard> = [];

  const foundList = elementsArray.find((list) => list.cards.some((card) => card.id === elementId));

  if (foundList) {
    cardsInList.push(...foundList.cards);
  }
  return cardsInList;
}

function extractMovedElement(elementsArray: Array<IColumn>, elementId: number): ICard | IColumn | undefined {
  // If changing cards position
  const cardsInList: Array<ICard> = extractCardsFromList(elementsArray, elementId);

  const movedElement =
    cardsInList.length > 0
      ? cardsInList.find((element) => element.id === elementId)
      : elementsArray.find((element) => element.id === elementId);
  if (movedElement) return movedElement;

  return undefined;
}

function filterElements(elementsArray: Array<IColumn>, elementId: number): Array<ICard | IColumn> {
  // If changing cards position
  const cardsInList: Array<ICard> = extractCardsFromList(elementsArray, elementId);

  const filteredElements =
    cardsInList.length > 0
      ? cardsInList.filter((element) => element.id !== elementId)
      : elementsArray.filter((element) => element.id !== elementId);

  return filteredElements;
}

function findCorrespondingList(elementsArray: Array<IColumn>, elementId: number): IColumn | undefined {
  return elementsArray.find((list) => list.cards.some((card) => card.id === elementId));
}

function copyDataFromReduxArray({ elementId, elementsArray, itemName }: IEditPos): Array<IEditedPos> {
  const resultArray: Array<IEditedPos> = [];

  // If changing cards position
  const foundList = findCorrespondingList(elementsArray, elementId);

  const filteredElements = filterElements(elementsArray, elementId);
  filteredElements.forEach((element) => {
    const newList: IEditedPos = {
      id: element.id,
      position: element.position,
    };

    // If changing cards position
    if (itemName === 'card') newList.list_id = foundList?.id;
    resultArray.push(newList);
  });

  return resultArray;
}

const isFromLeftToRight = (sourcePos: number, destPos: number): boolean => sourcePos < destPos;

export default function editPosition({ elementId, elementsArray, itemName }: IEditPos): Array<IEditedPos> {
  const resultArray: Array<IEditedPos> = copyDataFromReduxArray({ elementId, elementsArray, itemName });

  // If changing cards position
  const cardsInList: Array<ICard> = extractCardsFromList(elementsArray, elementId);

  // If changing cards position
  const initialArray = itemName === 'card' ? cardsInList : elementsArray;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const movedElement: any = extractMovedElement(elementsArray, elementId);

  if (movedElement && initialArray.indexOf(movedElement) === 0) {
    resultArray.forEach((curr) => {
      curr.position -= 1;
    });
  } else if (movedElement && initialArray.indexOf(movedElement) === initialArray.length - 1) {
    return [];
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

export function editPosOnDragInTheSameInstance({
  elementId,
  elementsArray,
  destPos,
  sourcePos,
  itemName,
}: IEditPos): Array<IEditedPos> {
  const resultArray: Array<IEditedPos> = [];
  // If changing cards position {
  let foundList: IColumn | undefined;
  let cardsInList: Array<ICard> = [];
  // }
  const from = Number(sourcePos);
  const to = Number(destPos);

  switch (itemName) {
    case 'column':
      elementsArray.forEach((element) => {
        const newList: IEditedPos = {
          id: element.id,
          position: element.position,
        };

        resultArray.push(newList);
      });
      break;

    case 'card':
      foundList = findCorrespondingList(elementsArray, elementId);
      cardsInList = extractCardsFromList(elementsArray, elementId);
      cardsInList.forEach((element) => {
        const newList: IEditedPos = {
          id: element.id,
          position: element.position,
          list_id: foundList?.id,
        };

        resultArray.push(newList);
      });
      break;
    default:
      break;
  }

  if (isFromLeftToRight(from, to)) {
    resultArray.slice(from, to + 1).forEach((item) => {
      if (item.id === elementId) {
        item.position += to - from;
      } else item.position -= 1;
    });
  }
  if (!isFromLeftToRight(from, to)) {
    resultArray.slice(to, from + 1).forEach((item) => {
      if (item.id === elementId) {
        item.position -= from - to;
      } else item.position += 1;
    });
  }

  return resultArray;
}
