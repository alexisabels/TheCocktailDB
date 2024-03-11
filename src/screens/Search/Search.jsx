/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-bind */
import React, { useState, useEffect } from 'react';
import './Search.css';
import { getCocktailByName } from '../../services/cocktailapi';
import SearchBox from '../../components/SearchBox/SearchBox';
import CardList from '../../components/CardList/CardList';

function Search() {
  const [drinks, setDrinks] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredDrinks, setFilteredDrinks] = useState([]);

  useEffect(() => {
    if (search) {
      getCocktailByName(search).then((data) => {
        if (data && data.drinks) {
          setDrinks(data.drinks);
          setFilteredDrinks(data.drinks);
        } else {
          setFilteredDrinks([]);
        }
      });
    } else {
      setFilteredDrinks([]);
    }
  }, [search]);

  function onSearchChange(searchTerm) {
    setSearch(searchTerm);
  }

  return (
    <div className="search-container">
      <div className="search-content">
        <h1 className="search-heading txt-white">Buscar un Cocktail</h1>
        <SearchBox
          placeholder="Enter a cocktail name"
          onSearchChange={onSearchChange}
        />
        {filteredDrinks.length === 0 && search && (
          <p className="no-results">
            No cocktails found with the name `&quot;`
            {search}
            `&quot;`
          </p>
        )}
        <CardList drinks={filteredDrinks} />
      </div>
    </div>
  );
}

export default Search;
