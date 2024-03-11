import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <Link to="/home">
          <img src="/logo.png" alt="Logo" />
        </Link>
      </div>
      <div className="button-container">
        <div className="search">
          <Link to="/search" className="search-button">
            Search cocktails
          </Link>
        </div>
        <div className="home-button">
          <Link to="/home" className="home-link">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
