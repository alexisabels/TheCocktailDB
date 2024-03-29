/* eslint-disable no-plusplus */
/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getRandomCocktail } from '../../services/cocktailapi';
import './RandomCocktail.css';

function RandomCocktails() {
  const [cocktails, setCocktails] = useState([]);

  useEffect(() => {
    const fetchRandomCocktails = async () => {
      try {
        const cocktailsArray = [];
        for (let i = 0; i < 8; i++) {
          const randomCocktail = await getRandomCocktail();
          cocktailsArray.push(randomCocktail.drinks[0]);
        }
        setCocktails(cocktailsArray);
      } catch (error) {
        console.error('Error fetching random cocktails:', error);
      }
    };

    fetchRandomCocktails();
  }, []);

  return (
    <div className="random-cocktails-container">
      <h2 className="random-cocktails-container__heading">Random Cocktails</h2>
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
            <div className="cocktail-name text-link">{cocktail.strDrink}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default RandomCocktails;
