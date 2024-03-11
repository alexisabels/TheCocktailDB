/* eslint-disable react/prop-types */
import React from 'react';
import './SearchBox.css';

function SearchBox({ placeholder, onSearchChange }) {
  function onInputChange(e) {
    onSearchChange(e.target.value);
  }

  return (
    <input
      className="search-box"
      type="search"
      placeholder={placeholder}
      onChange={onInputChange}
    />
  );
}

export default SearchBox;
