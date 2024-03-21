import './BoardError.scss';

export default function BoardError(): JSX.Element {
  return (
    <div className="error__wrapper">
      <div className="error__block">
        <div className="error__title">
          <h1>Сталась помилка</h1>
        </div>
        <div className="error__image">
          <img src="../src/assets/error.png" alt="Error" />
        </div>
      </div>
    </div>
  );
}
