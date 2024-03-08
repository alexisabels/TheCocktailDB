import React from 'react';
import './SearchBox.css';

const SearchBox = ({ placeholder, onSearchChange }) => {

  function onInputChange(e) {
    onSearchChange(e.target.value)
  }

  return (
    <input
      className='search-box'
      type='search'
      placeholder={placeholder}
      onChange={onInputChange}
    />
  );
}

export default SearchBox;
