import { ICardAction } from '../models/models';
import '../styles/CardAction.scss';
import SelectForm from './SelectForm';

export default function CardAction({ actionTitle, actionType, onClose }: ICardAction): JSX.Element {
  return (
    <div className="action__container">
      <div className="action__header">
        <div className="action__title">{actionTitle}</div>
        <div className="cancel tiny" onClick={onClose}>
          <div>X</div>
        </div>
      </div>
      <SelectForm actionType={actionType} />
    </div>
  );
}
