import { Link } from 'react-router-dom';
import '../styles/Navbar.scss';

export default function Navbar(): JSX.Element {
  return (
    <header className="header">
      <div className="container head">
        <div className="navbar__wrapper">
          <div className="title">
            <h1>Trello Doma</h1>
          </div>
          <nav className="navbar">
            <ul className="nav__list">
              <li className="nav__item" onClick={() => (document.body.style.backgroundColor = '#f1f2f4')}>
                <Link to="/">На головну</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
