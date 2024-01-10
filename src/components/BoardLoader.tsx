import '../styles/BoardLoader.scss';

export default function BoardLoader(): JSX.Element {
  return (
    <div className="anim__wrapper">
      <div className="loader__title">
        <h1>Вантажимо дошку</h1>
      </div>
      <div className="main__frame">
        <div className="first__column col">
          <div className="col__title" />
          <div className="card__block">
            <div className="first crd" />
            <div className="second crd" />
            <div className="third crd" />
          </div>
          <div className="footer__element" />
        </div>

        <div className="second__column col">
          <div className="col__title" />
          <div className="card__block">
            <div className="first crd" />
            <div className="second crd" />
          </div>

          <div className="footer__element" />
        </div>
        <div className="third__column col">
          <div className="col__title" />
          <div className="card__block">
            <div className="first crd big" />
            <div className="third crd" />
          </div>
          <div className="footer__element" />
        </div>
      </div>
    </div>
  );
}
