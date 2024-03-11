import React from 'react';
import { Link } from 'react-router-dom';
import './DrinkIngredients.css';
const DrinkIngredients = ({ ingredients }) => {
  const ingredientNames = Object.keys(ingredients)
    .filter((key) => key.startsWith('strIngredient') && ingredients[key])
    .map((key) => ingredients[key]);
  
  return (
    <div className="ingredient-grid">
      <h2>Ingredientes:</h2>
      <div className="ingredient-cards">
        {ingredientNames.map((ingredient, index) => (
          <Link key={index} to={`/ingredients/${ingredient}`} style={{ textDecoration: 'none' }}>
            <div className="ingredient-card">
              <img
                src={`https://www.thecocktaildb.com/images/ingredients/${ingredient}-Medium.png`}
                alt={ingredient}
              />
              <div className="ingredient-name">{ingredient}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DrinkIngredients;
