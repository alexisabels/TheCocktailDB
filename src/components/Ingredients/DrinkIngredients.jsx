/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Link } from 'react-router-dom';
import './DrinkIngredients.css';

function DrinkIngredients({ ingredients }) {
  const ingredientNames = Object.keys(ingredients)
    .filter((key) => key.startsWith('strIngredient') && ingredients[key])
    .map((key) => ingredients[key]);

  return (
    <section className="ingredient-grid" aria-label="Ingredients">
      <h2 className="ingredient-grid__heading">Ingredients</h2>
      <div className="ingredient-cards">
        {ingredientNames.map((ingredient, index) => (
          <Link
            key={index}
            to={`/ingredients/${ingredient}`}
            className="ingredient-link"
            aria-label={`Browse cocktails with ${ingredient}`}
          >
            <div className="ingredient-card">
              <img
                src={`https://www.thecocktaildb.com/images/ingredients/${ingredient}-Medium.png`}
                alt={`${ingredient} ingredient`}
                className="ingredient-card__image"
                loading="lazy"
              />
              <div className="ingredient-card__name">{ingredient}</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default DrinkIngredients;
