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
    title: 'Cocktail Search - Find Any Cocktail Recipe by Name',
    description: 'Search hundreds of cocktail recipes by name. Type a cocktail name to see full ingredients with measures, glassware and method. Classic and modern drinks.',
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
        <p className="search-eyebrow">The Cocktail Compendium</p>
        <h1 className="search-heading">
          Find your
          {' '}
          <em>cocktail</em>
        </h1>
        <SearchBox
          placeholder="Enter a cocktail name"
          onSearchChange={onSearchChange}
        />
        {filteredDrinks.length === 0 && search && (
          <p className="no-results">
            No cocktails found with the name &ldquo;
            {search}
            &rdquo;
          </p>
        )}
        <CardList drinks={filteredDrinks} />
      </div>
    </div>
  );
}

export default Search;
