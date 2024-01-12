import { IInputField } from '../models/models';
import '../styles/InputField.scss';

export default function InputField({
  id,
  placeholder,
  buttonText,
  onChange,
  onSubmit,
  actionType,
  onClose,
}: IInputField): JSX.Element {
  return (
    <div className="input__block">
      <div onClick={onClose}>X</div>
      <form id={id ? `${id}` : ''} name="columnTitle" className="input__form" onSubmit={(e) => onSubmit(e, actionType)}>
        <input
          className="form__input"
          type="text"
          placeholder={placeholder}
          name="columnTitle"
          maxLength={16}
          minLength={1}
          required
          onChange={(event) => onChange(event?.target.value)}
        />
        <button className="add" type="submit">
          {buttonText}
        </button>
      </form>
    </div>
  );
}
