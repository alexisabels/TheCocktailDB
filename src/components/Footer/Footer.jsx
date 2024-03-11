import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const alphabet = Array.from(Array(26), (_, i) => String.fromCharCode(65 + i));

  return (
    <footer className="footer text-white">
      <h2>Browse By Name</h2>
      <div className="alphabet-links">
        {alphabet.map(letter => (
          <Link key={letter} to={`/cocktails/${letter}`} style={{ textDecoration: 'none', color: 'white'}}>{letter} / </Link>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
