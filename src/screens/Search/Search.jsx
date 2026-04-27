/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-bind */
import React, { useState, useEffect } from 'react';
import './Search.css';
import { getCocktailByName } from '../../services/cocktailapi';
import SearchBox from '../../components/SearchBox/SearchBox';
import CardList from '../../components/CardList/CardList';
import usePageMeta from '../../hooks/usePageMeta';

function Search() {
  const [drinks, setDrinks] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredDrinks, setFilteredDrinks] = useState([]);

  usePageMeta({
    title: 'Search Cocktails by Name',
    description: 'Find any cocktail recipe by name. Search hundreds of classic and modern cocktail recipes with full ingredients and method.',
    path: '/search',
  });

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
        <h1 className="search-heading">Search cocktails</h1>
        <SearchBox
          placeholder="Type a cocktail name"
          onSearchChange={onSearchChange}
        />
        {filteredDrinks.length === 0 && search && (
          <p className="no-results">
            No cocktails found for &ldquo;
            {search}
            &rdquo;.
          </p>
        )}
        <CardList drinks={filteredDrinks} />
      </div>
    </div>
  );
}

export default Search;
