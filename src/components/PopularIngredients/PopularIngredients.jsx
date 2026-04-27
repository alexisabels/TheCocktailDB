/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getIngredientByName } from '../../services/cocktailapi';
import './PopularIngredients.css';

function PopularIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const ingredientNames = [
    'Whisky',
    'Sugar',
    'Gin',
    'Tequila',
  ];

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const ingredientsArray = [];

        for (const ingredientName of ingredientNames) {
          const ingredient = await getIngredientByName(ingredientName);
          ingredientsArray.push(ingredient.ingredients[0]);
        }

        setIngredients(ingredientsArray);
      } catch (error) {
        console.error('Error fetching ingredients:', error);
      }
    };

    fetchIngredients();
  }, []);

  return (
    <section className="popular-ingredients-container" aria-labelledby="popular-ingredients-heading">
      <h2 id="popular-ingredients-heading" className="popular-ingredients-container__heading">Favourite Ingredients</h2>
      <div className="ingredient-grid">
        {ingredients.map((ingredient) => (
          <Link
            key={ingredient.idIngredient}
            to={`/ingredients/${ingredient.strIngredient}`}
            className="ingredient-card"
            aria-label={`Browse cocktails with ${ingredient.strIngredient}`}
          >
            <img
              src={`https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient}-Medium.png`}
              alt={`${ingredient.strIngredient} ingredient`}
              className="ingredient-card__image"
              loading="lazy"
            />
            <div className="ingredient-card__name">{ingredient.strIngredient}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default PopularIngredients;
