import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/" aria-label="The Cocktail Compendium - Home">
          <img
            src="/logo.png"
            alt="The Cocktail Compendium logo"
            className="header__logo-image"
          />
        </Link>
      </div>
      <nav className="header__button-container" aria-label="Primary">
        <Link to="/search" className="header__search-button">
          Search cocktails
        </Link>
        <Link to="/" className="header__home-link">
          Home
        </Link>
      </nav>
    </header>
  );
}

export default Header;
