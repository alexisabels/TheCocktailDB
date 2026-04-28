import React, { useState, useEffect } from 'react';
import './Search.css';
import { getCocktailByName } from '../../services/cocktailapi';
import SearchBox from '../../components/SearchBox/SearchBox';
import CardList from '../../components/CardList/CardList';
import usePageMeta from '../../hooks/usePageMeta';

function Search() {
  const [search, setSearch] = useState('');
  const [drinks, setDrinks] = useState([]);
  const [status, setStatus] = useState('idle');

  usePageMeta({
    title: 'Cocktail Search - Find Any Cocktail Recipe by Name',
    description: 'Search hundreds of cocktail recipes by name. Type a cocktail name to see full ingredients with measures, glassware and method. Classic and modern drinks.',
    path: '/search',
  });

  useEffect(() => {
    if (!search) {
      setDrinks([]);
      setStatus('idle');
      return undefined;
    }
    setStatus('loading');
    const handle = setTimeout(() => {
      getCocktailByName(search)
        .then((data) => {
          setDrinks(data.drinks || []);
          setStatus('done');
        })
        .catch(() => {
          setDrinks([]);
          setStatus('error');
        });
    }, 300);
    return () => clearTimeout(handle);
  }, [search]);

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
          onSearchChange={setSearch}
        />
        {status === 'loading' && (
          <p className="no-results">Searching&hellip;</p>
        )}
        {status === 'error' && (
          <p className="no-results">Something went wrong. Please try again.</p>
        )}
        {status === 'done' && drinks.length === 0 && (
          <p className="no-results">
            No cocktails found for &ldquo;
            {search}
            &rdquo;.
          </p>
        )}
        <CardList drinks={drinks} />
      </div>
    </div>
  );
}

export default Search;
