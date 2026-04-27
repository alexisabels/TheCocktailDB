/* eslint-disable react/jsx-indent */
/* eslint-disable no-trailing-spaces */
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getCocktailsByIngredient } from '../../services/cocktailapi';
import './Ingredients.css'; 

function Ingredients() {
  const { ingredient } = useParams();
  const [cocktails, setCocktails] = useState([]);

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
      <h2 className="ingredients-screen__heading">
        Cócteles con
        {' '}
        <span>{ingredient}</span>
      </h2>
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
