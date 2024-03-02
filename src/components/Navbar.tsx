import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.scss';

export default function Navbar(): JSX.Element {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleClick = (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    navigate('/');
    document.body.style.backgroundColor = '#f1f2f4';
  };

  return (
    <header className="header">
      <div className="container head">
        <div className="navbar__wrapper">
          <div className="title">
            <h1>Trello Doma</h1>
          </div>
          <nav className="navbar">
            <ul className="nav__list">
              {token && (
                <>
                  <li className="nav__item" onClick={() => (document.body.style.backgroundColor = '#f1f2f4')}>
                    <Link to="/home">На головну</Link>
                  </li>
                  <li className="nav__item">
                    <button onClick={handleClick}>Вийти</button>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
