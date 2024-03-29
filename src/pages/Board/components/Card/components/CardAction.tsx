import { ICardAction } from '../../../../../models/models';
import './CardAction.scss';
import SelectForm from '../../../../../components/SelectForm';

export default function CardAction({ actionTitle, actionType, onClose, listId, cardId }: ICardAction): JSX.Element {
  return (
    <div className="action__container">
      <div className="action__header">
        <div className="action__title">{actionTitle}</div>
        <div className="cancel tiny" onClick={onClose}>
          <div>X</div>
        </div>
      </div>
      <SelectForm actionType={actionType} listId={listId} cardId={cardId} />
    </div>
  );
}
