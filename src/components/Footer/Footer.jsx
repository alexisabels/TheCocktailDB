import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const alphabet = Array.from(Array(26), (_, i) => String.fromCharCode(65 + i));

  return (
    <footer className="footer text-white">
      <div className="footer__content">
        <h2 className="footer__heading">Browse By Name</h2>
        <nav className="alphabet-links" aria-label="Browse cocktails alphabetically">
          {alphabet.map((letter) => (
            <Link
              key={letter}
              to={`/cocktails/${letter}`}
              className="alphabet-link"
              aria-label={`Cocktails starting with ${letter}`}
            >
              {letter}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
