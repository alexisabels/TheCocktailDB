/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCocktailDetail } from '../../services/cocktailapi';
import './PopularDrinks.css';

function PopularDrinks() {
  const [cocktails, setCocktails] = useState([]);
  const cocktailIds = [
    '178365', // Gin Tonic
    '178366', // Gin Lemon
    '11007', // Margarita
    '11202', // Caipirinha
    '11001', // Old Fashioned
    '11064', // Banana Daiquiri
    '13020', // Sangria
    '13206', // Caipirissima
  ];

  useEffect(() => {
    const fetchCocktails = async () => {
      try {
        const cocktailsArray = [];

        for (const id of cocktailIds) {
          const cocktailDetail = await getCocktailDetail(id);
          cocktailsArray.push(cocktailDetail.drinks[0]);
        }

        setCocktails(cocktailsArray);
      } catch (error) {
        console.error('Error fetching cocktails:', error);
      }
    };

    fetchCocktails();
  }, []);

  return (
    <div className="popular-cocktails-container">
      <h2 className="popular-cocktails-container__heading">Cocktails Favoritos</h2>
      <div className="cocktail-grid text-link">
        {cocktails.map((cocktail) => (
          <Link
            key={cocktail.idDrink}
            to={`/drink/${cocktail.idDrink}`}
            className="col-3 cocktail-card text-link"
          >
            <img
              src={cocktail.strDrinkThumb}
              alt={cocktail.strDrink}
              className="cocktail-card__image"
            />
            <div className="cocktail-card__name text-link">{cocktail.strDrink}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default PopularDrinks;
