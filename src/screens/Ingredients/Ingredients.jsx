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
    <div>
      <h2>
        Cócteles con
        {' '}
        {ingredient}
        :
      </h2>
      <div className="cocktail-cards card-list">
        {cocktails.map((cocktail) => (
          <div key={cocktail.idDrink} className="col-3">
            <Link to={`/drink/${cocktail.idDrink}`}>
              <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
              <h3>{cocktail.strDrink}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Ingredients;
