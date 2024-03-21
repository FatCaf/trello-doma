/* eslint-disable @typescript-eslint/no-shadow */
import { useState, useEffect } from 'react';
import * as React from 'react';
import { useParams } from 'react-router';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import Column from './components/Column/Column';
import './Board.scss';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchBoard } from '../../store/slices/boardSlice';
import { ICard, IEditedPos, IEditPos, IHandleAdd, IHandleEdit } from '../../models/models';
import BoardLoader from './BoardLoader';
import BoardError from './BoardError';
import BoardSideBar from './components/Sidebar/BoardSideBar';
import InputField from '../../components/InputField';
import BoardHeader from './components/BoardHeader';
import MobileSidebar from './components/Sidebar/MobileSidebar';
import CardModal from './components/Card/components/CardModal';
import { handleAdd, handleEdit } from '../../common/handlers/handlers';
import editPosition, {
  editPosOnDragInTheSameInstance,
  extractCardsFromList,
} from '../../common/handlers/positionEditor';
import { deleteCard } from '../../store/slices/cardSlice';

export default function Board(): JSX.Element {
  const [title, setTitle] = useState('Безіменна колонка');
  const ids = useParams<{ boardId: string }>();
  const boardId = ids.boardId as string;
  const dispatch = useAppDispatch();
  const { isBoardLoaded, isPosEdited, status, board } = useAppSelector((state) => state.board);
  const { isCardAdded, isCardDeleted } = useAppSelector((state) => state.card);
  const { lists } = useAppSelector((state) => state.board.board);
  const backgroundColor = useAppSelector((state) => state.board.board.custom.background);
  const [isAddColumnClicked, setAddColumnClicked] = useState(false);
  const urlParams = window.location.href.split('/');
  const [mobileSidebarClicked, setMobileSidebarClicked] = useState(false);

  useEffect(() => {
    const getBoard = async (): Promise<void> => {
      await dispatch(fetchBoard(boardId));
      document.body.style.backgroundColor = backgroundColor;
    };

    getBoard();
  }, [backgroundColor, boardId, dispatch, isPosEdited, isCardAdded, isCardDeleted]);

  const handleInputSubmit = async (event: React.FormEvent<HTMLFormElement>, actionType: string): Promise<void> => {
    event.preventDefault();
    if (actionType === 'add') {
      const postData = {
        title,
        position: lists.length ? lists.length + 1 : 1,
      };
      const props: IHandleAdd = {
        action: 'addColumn',
        dispatch,
        data: postData,
        boardId,
      };
      await handleAdd(props);
    }
  };

  const handleDragEnd = async (results: DropResult): Promise<void> => {
    const { source, destination, draggableId, type } = results;
    let posArray: IEditedPos[] = [];
    const action = type === 'column' ? 'editColumnsPosition' : 'editCardsPosition';
    const draggableCard: ICard | null =
      type === 'card'
        ? extractCardsFromList(lists, Number(draggableId)).reduce((acc: ICard | null, item: ICard) => {
            if (item.id === Number(draggableId)) {
              return item;
            }
            return acc;
          }, null)
        : null;

    const Posprops: IEditPos = {
      elementsArray: lists,
      elementId: Number(draggableId),
      itemName: type,
      destPos: destination?.index,
      sourcePos: source.index,
    };

    if (!destination) return;

    if (source.droppableId === destination?.droppableId) {
      if (source.index !== destination.index) {
        posArray = editPosOnDragInTheSameInstance(Posprops);
      }
    }

    if (source.droppableId !== destination?.droppableId) {
      posArray = editPosition(Posprops);
      const props: IHandleAdd = {
        action: 'addCard',
        dispatch,
        boardId,
        data: {
          title: draggableCard?.title,
          list_id: Number(destination.droppableId),
          description: draggableCard?.description,
          position: destination.index + 1,
        },
      };
      await handleAdd(props);
      await dispatch(deleteCard({ boardId, cardId: draggableId }));
    }

    const props: IHandleEdit = {
      action,
      dispatch,
      boardId,
      data: posArray,
    };

    await handleEdit(props);
  };

  return (
    <div className="board" key={boardId} id={`${boardId}`}>
      {status === 'rejected' ? (
        <BoardError />
      ) : (
        <>
          <BoardSideBar />
          {mobileSidebarClicked && (
            <MobileSidebar
              onClose={() => setMobileSidebarClicked(!mobileSidebarClicked)}
              isHidden={mobileSidebarClicked}
            />
          )}
          <div className="board__wrapper">
            {status === 'loading' && <BoardLoader />}
            <BoardHeader boardTitle={board.title} onOpen={() => setMobileSidebarClicked(!mobileSidebarClicked)} />
            <div className="board__main__content">
              {urlParams.includes('card') && isBoardLoaded && <CardModal cardId={urlParams[urlParams.length - 1]} />}
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="board" type="column" direction="horizontal" isCombineEnabled>
                  {(provided): JSX.Element => (
                    <div className="columns" key="columns" {...provided.droppableProps} ref={provided.innerRef}>
                      {lists &&
                        lists.map((list, index) => (
                          <Draggable draggableId={String(list?.id)} key={list?.id} index={index}>
                            {(provided): JSX.Element => <Column {...list} key={list?.id} provided={provided} />}
                          </Draggable>
                        ))}
                      <div className="add__column__wrapper">
                        <div className="add__column">
                          {isAddColumnClicked ? (
                            <InputField
                              buttonText="Додати"
                              placeholder="Введіть назву колонки"
                              onChange={setTitle}
                              onSubmit={handleInputSubmit}
                              onClose={() => setAddColumnClicked(false)}
                              actionType="add"
                            />
                          ) : (
                            <p onClick={() => setAddColumnClicked(true)}>
                              <span>+</span> Додати нову колонку
                            </p>
                          )}
                        </div>
                      </div>
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
