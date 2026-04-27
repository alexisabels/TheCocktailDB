import React from 'react';
import RandomCocktails from '../../components/RandomList/RandomCocktails';
import PopularDrinks from '../../components/PopularDrinks/PopularDrink';
import PopularIngredients from '../../components/PopularIngredients/PopularIngredients';
import usePageMeta from '../../hooks/usePageMeta';

import './Home.css';

function Home() {
  usePageMeta({
    title: 'Classic Cocktail Recipes & Ingredients',
    description: 'A library of classic and modern cocktail recipes. Browse drinks by name, letter or ingredient, with full method and glassware for every cocktail.',
    path: '/',
  });

  return (
    <div>
      <section className="home-hero">
        <h1 className="home-hero__title">A library of cocktails.</h1>
        <p className="home-hero__subtitle">
          Browse hundreds of recipes by name, letter or ingredient.
        </p>
      </section>
      <RandomCocktails />
      <PopularIngredients />
      <PopularDrinks />
    </div>
  );
}

export default Home;
