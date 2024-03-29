import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const alphabet = Array.from(Array(26), (_, i) => String.fromCharCode(65 + i));

  return (
    <footer className="footer text-white">
      <div className="footer__content">
        <h2 className="footer__heading">Browse By Name</h2>
        <div className="alphabet-links">
          {alphabet.map((letter) => (
            <Link key={letter} to={`/cocktails/${letter}`} className="alphabet-link">
              {letter}
              {' '}
              /
              {' '}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
