import React from 'react';
import RandomCocktails from '../../components/RandomList/RandomCocktails';
import PopularDrinks from '../../components/PopularDrinks/PopularDrink';
import PopularIngredients from '../../components/PopularIngredients/PopularIngredients';

import './Home.css';

function Home() {
  return (
    <div>
      <hr />
      <div className="home-container">
        <div className="left-image">
          <img src="/cocktail.png" alt="Cocktail" />
        </div>
        <div className="center-text">
          <h1>Welcome to TheCocktailDB</h1>
        </div>
        <div className="right-image">
          <img src="/cocktail.png" alt="Cocktail" />
        </div>
      </div>
      <hr />
      <RandomCocktails />
      <hr />
      <PopularIngredients />
      <hr />
      <PopularDrinks />
    </div>
  );
}

export default Home;
