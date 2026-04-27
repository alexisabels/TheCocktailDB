import React from 'react';
import RandomCocktails from '../../components/RandomList/RandomCocktails';
import PopularDrinks from '../../components/PopularDrinks/PopularDrink';
import PopularIngredients from '../../components/PopularIngredients/PopularIngredients';
import usePageMeta from '../../hooks/usePageMeta';

import './Home.css';

function Home() {
  usePageMeta({
    title: 'Classic Cocktail Recipes & Ingredients',
    description: 'A curated journey through timeless cocktail recipes, refined ingredients and the art of the perfectly balanced glass. Browse hundreds of drinks by name, letter or ingredient.',
    path: '/',
  });

  return (
    <div>
      <section className="home-hero">
        <p className="home-hero__eyebrow">Est. Recipes from the Classic Era</p>
        <h1 className="home-hero__title">
          The
          {' '}
          <em>Cocktail</em>
          {' '}
          Compendium
        </h1>
        <div className="home-hero__ornament" aria-hidden="true">
          <span>&#9670;</span>
        </div>
        <p className="home-hero__subtitle">
          A curated journey through timeless drinks, refined ingredients
          and the art of the perfectly balanced glass.
        </p>
      </section>
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
