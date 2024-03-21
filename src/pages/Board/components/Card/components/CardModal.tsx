/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-shadow */
import './CardModal.scss';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import addSvg from '../../../../../assets/add.svg';
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks';
import { ICard, IColumn, IEditPos, IHandleDelete, IHandleEdit } from '../../../../../models/models';
import User from '../../../../../components/User';
import InputField from '../../../../../components/InputField';
import { handleDelete, handleEdit } from '../../../../../common/handlers/handlers';
import CardAction from './CardAction';
import editPosition from '../../../../../common/handlers/positionEditor';
import instance from '../../../../../api/requests';
import { fetchBoardsSequentially } from '../../../../../store/slices/cardModalSlice';

export default function CardModal({ cardId }: { cardId: string }): JSX.Element {
  const dispatch = useAppDispatch();
  const ids = useParams<{ boardId: string }>();
  const boardId = ids.boardId as string;
  const lists = useAppSelector((state) => state.board.board.lists);
  const boards = useAppSelector((state) => state.boards.boards);
  const [tempUser] = useState(['Ivan', 'Vasya', 'Petya']);
  const [isCardTitleClicked, setCardTitleClicked] = useState(false);
  const [cardTitle, setCardTitle] = useState('');
  const [isDescriptionClicked, setDescriptionClicked] = useState(false);
  const [descriptionText, setDescriptionText] = useState('');
  const [isMoveClicked, setMoveClicked] = useState(false);
  const [isCopyClicked, setCopyClicked] = useState(false);
  const [list] = useState<IColumn>(
    lists.find((list) => list.cards.some((card) => card.id === Number(cardId))) as IColumn
  );
  const [card] = useState<ICard>(list.cards.find((card) => card.id === Number(cardId)) as ICard);
  const navigate = useNavigate();

  useEffect(() => {
    const getAllBoards = async (): Promise<void> => {
      await dispatch(fetchBoardsSequentially(boards));
    };

    getAllBoards();
  }, [boards, dispatch]);

  const handleClick = async (event: React.MouseEvent<HTMLDivElement>): Promise<void> => {
    const Posprops: IEditPos = {
      elementsArray: lists,
      elementId: Number(event.currentTarget.id),
      itemName: 'card',
    };

    const posArray = editPosition(Posprops);

    const props: IHandleDelete = {
      action: 'deleteCard',
      event,
      dispatch,
      boardId,
    };
    await handleDelete(props);
    if (posArray.length > 0) await instance.put(`board/${boardId}/card`, posArray);
  };

  const handleInputSubmit = async (event: React.FormEvent<HTMLFormElement>, actionType: string): Promise<void> => {
    event.preventDefault();
    if (actionType === 'edit') {
      const editData = {
        title: cardTitle.length > 0 ? cardTitle : card?.title,
        description: descriptionText.length > 0 ? descriptionText : card?.description,
        list_id: list?.id,
      };
      const props: IHandleEdit = {
        action: 'editCard',
        boardId,
        dispatch,
        event,
        data: editData,
      };
      await handleEdit(props);
      setCardTitleClicked(false);
      setDescriptionClicked(false);
    }
  };

  return (
    <div className="wrapper">
      <div className="card__modal">
        <div className="modal__header">
          <div className="titles">
            {isCardTitleClicked ? (
              <InputField
                id={Number(cardId)}
                buttonText="Змінити"
                placeholder="Введіть назву картки"
                onChange={setCardTitle}
                onSubmit={handleInputSubmit}
                onClose={() => setCardTitleClicked(false)}
                actionType="edit"
              />
            ) : (
              <h4 onClick={() => setCardTitleClicked(true)} className="modal__title">
                {card?.title}
              </h4>
            )}
            <h6 className="modal__subtitile">{`З колонки ${list?.title}`}</h6>
          </div>
          <div
            className="cancel cancel-card"
            onClick={() => {
              navigate(`/board/${boardId}`);
            }}
          >
            <div>X</div>
          </div>
        </div>
        <div className="main__content">
          <div className="block__one">
            <div className="users">
              <h6>Учасники</h6>
              <div className="users__container">
                <div className="user__list">
                  {tempUser && tempUser.map((user) => <User userName={user} key={user} />)}
                  <div className="user__add">
                    <img src={addSvg} alt="Додати" />
                  </div>
                </div>
                <div className="join">Приєднатись</div>
              </div>
            </div>
            <div className="description">
              <div className="description__header">
                <h6>Опис</h6>
              </div>
              <div
                className={
                  card?.description
                    ? 'description__text'
                    : isDescriptionClicked
                      ? 'description__text'
                      : 'description__text empty'
                }
              >
                {isDescriptionClicked ? (
                  <div className="edit__description">
                    <form
                      id={cardId}
                      name="description"
                      onSubmit={(event: React.FormEvent<HTMLFormElement>) => handleInputSubmit(event, 'edit')}
                    >
                      <textarea
                        className="description__area"
                        name="description"
                        id=""
                        cols={50}
                        rows={10}
                        defaultValue={card?.description}
                        onChange={(event) => setDescriptionText(event.target.value)}
                      />
                      <div className="button__block">
                        <button className="save" type="submit">
                          Зберегти
                        </button>
                        <button className="cancel btn" onClick={() => setDescriptionClicked(false)}>
                          Відмінити
                        </button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <p onClick={() => setDescriptionClicked(true)}>
                    {card?.description ? card?.description : 'Додайте опис до картки'}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="actions">
            <div className="copy" onClick={() => setCopyClicked(true)}>
              Копіювати
            </div>
            {isCopyClicked && (
              <CardAction
                onClose={() => setCopyClicked(false)}
                actionTitle="Копіювання картки"
                actionType="copy"
                listId={Number(list?.id)}
                cardId={cardId}
              />
            )}
            <div className="move" onClick={() => setMoveClicked(true)}>
              Перемістити
            </div>
            {isMoveClicked && (
              <CardAction
                onClose={() => setMoveClicked(false)}
                actionTitle="Переміщення картки"
                actionType="move"
                listId={Number(list?.id)}
                cardId={cardId}
              />
            )}
            <div className="archive" id={cardId} data-name={card?.title} onClick={(event) => handleClick(event)}>
              Видалити
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
