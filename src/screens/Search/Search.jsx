import React, { useState, useEffect } from 'react';
import './Search.css';
import { getCocktailByName } from '../../services/cocktailapi';
import SearchBox from '../../components/SearchBox';
import CardList from '../../components/CardList/CardList';

//declaramos el componente App como función
function Search() {

  //Inicializamos el estado del componente con hooks
  const [drinks, setDrinks] = useState([]);
  const [search, setSearch] = useState('');

  //hook useEffect que se ejecuta para inicializar el componente
  useEffect(() => {
    if (search) {
      getCocktailByName(search).then(data => setDrinks(data.drinks)); // Modificación aquí
    }
  }, [search])


  function onSearchChange(searchTerm) {
   setSearch(searchTerm)
  }

  const filteredDrinks = drinks.filter(drink => {
    return drink.strDrink.toLowerCase().includes(search.toLowerCase());
});

  

  //renderizado del componente:
  return (
    <div className="App">
      <header className="App-header">
        <h3>Search a Cocktail</h3>
        <SearchBox
          placeholder="Write a cocktail name"
          onSearchChange={onSearchChange}
        />
      <CardList drinks={filteredDrinks} />
      </header>
    </div>
  );
}

export default Search;