import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getCocktailsByIngredient } from '../../services/cocktailapi';
import './Ingredients.css'; // Agrega tu CSS de estilos aquí

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
      <img src="" alt="" />
      <div className="cocktail-cards">
        {cocktails.map(cocktail => (
          <div key={cocktail.idDrink} className="card">
            <Link to={`/drink/${cocktail.idDrink}`}>
              <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
              <h3>{cocktail.strDrink}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ingredients;
