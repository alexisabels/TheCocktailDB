import React from 'react';
import { Link } from 'react-router-dom';
import useLikes from '../../hooks/useLikes';
import './Header.css';

function Header() {
  const { liked } = useLikes();
  const count = liked.length;

  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/" aria-label="The Cocktail Compendium - Home">
          <img
            src="/logo.png"
            alt="The Cocktail Compendium logo"
            className="header__logo-image"
            width="240"
            height="88"
          />
        </Link>
      </div>
      <nav className="header__button-container" aria-label="Primary">
        <Link to="/search" className="header__search-button">
          Search cocktails
        </Link>
        <Link
          to="/favorites"
          className="header__favorites-link"
          aria-label={
            count > 0
              ? `Favorites (${count} saved)`
              : 'Favorites'
          }
        >
          <svg
            className="header__favorites-icon"
            viewBox="0 0 24 24"
            width="16"
            height="16"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M12 20.6s-7.6-4.6-9.6-9.3C1.1 8.1 3 4.8 6.2 4.8c2 0 3.4 1 4.4 2.5l1.4 2.1 1.4-2.1c1-1.5 2.4-2.5 4.4-2.5 3.2 0 5.1 3.3 3.8 6.5C19.6 16 12 20.6 12 20.6Z"
              fill={count > 0 ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          </svg>
          <span>Favorites</span>
          {count > 0 && (
            <span className="header__favorites-badge" aria-hidden="true">
              {count}
            </span>
          )}
        </Link>
        <Link to="/" className="header__home-link">
          Home
        </Link>
      </nav>
    </header>
  );
}

export default Header;
