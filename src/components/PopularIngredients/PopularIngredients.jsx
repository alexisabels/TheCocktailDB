import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getIngredientByName } from '../../services/cocktailapi';
import './PopularIngredients.css';

const INGREDIENT_NAMES = ['Whisky', 'Sugar', 'Gin', 'Tequila'];

function PopularIngredients() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    let cancelled = false;
    Promise.all(INGREDIENT_NAMES.map((name) => getIngredientByName(name)))
      .then((results) => {
        if (cancelled) return;
        setIngredients(results.map((r) => r.ingredients[0]).filter(Boolean));
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  if (ingredients.length === 0) return null;

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
