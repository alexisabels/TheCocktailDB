import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <div className="header">
      <div className="header__logo">
        <Link to="/">
          <img src="/logo.png" alt="Logo" className="header__logo-image" />
        </Link>
      </div>
      <div className="header__button-container">
        <div className="header__search">
          <Link to="/search" className="header__search-button">
            Search cocktails
          </Link>
        </div>
        <div className="header__home-button">
          <Link to="/" className="header__home-link">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
