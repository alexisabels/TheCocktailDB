import React, { useState, useEffect } from 'react';
import './Search.css';
import { getCocktailByName } from '../../services/cocktailapi';
import SearchBox from '../../components/SearchBox';
import CardList from '../../components/CardList/CardList';

function Search() {
  const [drinks, setDrinks] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredDrinks, setFilteredDrinks] = useState([]);

  useEffect(() => {
    if (search) {
      getCocktailByName(search).then(data => {
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
    <div className="App">
      <header className="App-header">
        <h3>Search a Cocktail</h3>
        <SearchBox
          placeholder="Write a cocktail name"
          onSearchChange={onSearchChange}
        />
        {filteredDrinks.length === 0 && search && (
          <p>No hay ningún cocktail que se llame "{search}"</p>
        )}
        <CardList drinks={filteredDrinks} />
      </header>
    </div>
  );
}

export default Search;
