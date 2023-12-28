import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.scss';

export default function Navbar(): JSX.Element {
  return (
    <header className="header">
      <div className="title">
        <h1>Trello Doma</h1>
      </div>
      <nav className="navbar">
        <ul className="nav__list">
          <li className="nav__item">
            <Link to="/">На головну</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
