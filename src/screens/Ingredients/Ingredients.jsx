import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCocktailsByIngredient } from '../../services/cocktailapi';

const Ingredients = () => {
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
    <div className="cocktail-list">
      <h2>Cócteles con {ingredient}:</h2>
      
      <div className="cocktail-cards">
        {cocktails.map(cocktail => (
          <div key={cocktail.idDrink} className="cocktail-card">
            <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
            <div className="cocktail-name">{cocktail.strDrink}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ingredients;
