import React, { useState, useEffect } from 'react';
import './Search.css';
//import { getPokes } from '../../services/pokeapi'
import SearchBox from '../../components/SearchBox';
//import CardList from '../../components/CardList/CardList';

//declaramos el componente App como función
function Search() {

  //Inicializamos el estado del componente con hooks
  //const [pokes, setPokes] = useState([]);
  //const [search, setSearch] = useState('');

  //hook useEffect que se ejecuta para inicializar el componente
  useEffect(() => {

   // getPokes().then(pokes => setPokes(pokes));

  }, [])


  function onSearchChange(searchTerm) {
 //   setSearch(searchTerm)
  }

 /* const filteredPokemons = pokes.filter(pokemon => {
    return pokemon.name.toLowerCase().startsWith(search.toLowerCase());
  }); */

  //renderizado del componente:
  return (
    <div className="App">
      <header className="App-header">
        <h3>Search a Pokemon</h3>
        <SearchBox
          placeholder="Write a pokemon name"
          onSearchChange={onSearchChange}
        />
      </header>
    </div>
  );
}

export default Search;