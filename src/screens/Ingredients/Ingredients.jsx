/* eslint-disable react/jsx-indent */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getCocktailsByIngredient } from '../../services/cocktailapi';
import usePageMeta from '../../hooks/usePageMeta';
import './Ingredients.css';

function Ingredients() {
  const { ingredient } = useParams();
  const [cocktails, setCocktails] = useState([]);

  usePageMeta({
    title: `Cocktails with ${ingredient}`,
    description: `Browse cocktail recipes that use ${ingredient}. Discover classic and modern drinks featuring ${ingredient} as a key ingredient.`,
    path: `/ingredients/${ingredient}`,
  });

  useEffect(() => {
    const fetchCocktails = async () => {
      try {
        const data = await getCocktailsByIngredient(ingredient);
        setCocktails(data.drinks);
      } catch (error) {
        console.error('Error fetching cocktails by ingredient:', error);
      }
    };

    fetchCocktails();
  }, [ingredient]);

  return (
    <section className="ingredients-screen">
      <p className="ingredients-screen__eyebrow">Crafted with</p>
      <h1 className="ingredients-screen__heading">
        Cocktails with
        {' '}
        <span>{ingredient}</span>
      </h1>
      <ul className="ingredient-cocktails">
        {cocktails && cocktails.map((cocktail) => (
          <li key={cocktail.idDrink} className="ingredient-cocktail">
            <Link to={`/drink/${cocktail.idDrink}`}>
              <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
              <h3>{cocktail.strDrink}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Ingredients;
