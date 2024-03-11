/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
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
    <div className="popular-ingredients-container">
      <h2 className="popular-ingredients-container__heading">Ingredientes Favoritos</h2>
      <div className="ingredient-grid text-link">
        {ingredients.map((ingredient) => (
          <Link
            key={ingredient.idIngredient}
            to={`/ingredients/${ingredient.strIngredient}`}
            className="col-3 ingredient-card text-link"
          >
            <img
              src={`https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient}-Medium.png`}
              alt={ingredient.strIngredient}
              className="ingredient-card__image"
            />
            <div className="ingredient-card__name text-link">{ingredient.strIngredient}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default PopularIngredients;
