import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <Link to="/">
          <img src="/logo.png" alt="Logo" />
        </Link>
      </div>
      <div className="search">
  <Link to="/search" className="search-button">
    Search cocktails
  </Link>
</div>

    </div>
  );
}

export default Header;
