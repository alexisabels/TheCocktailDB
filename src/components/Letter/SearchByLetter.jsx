import React from 'react';
import { Link } from 'react-router-dom';

function SearchByLetter() {
  const alphabet = Array.from(Array(26), (_, i) => String.fromCharCode(65 + i));

  return (
    <div className="browse-by-letter text-white">
      <h2>Browse By Letter</h2>
      <div className="letter-links">
        {alphabet.map((letter) => (
          <Link key={letter} to={`/cocktails/${letter}`}>{letter}</Link>
        ))}
      </div>
    </div>
  );
}

export default SearchByLetter;
