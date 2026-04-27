/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
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
    <section className="popular-cocktails-container" aria-labelledby="house-favourites-heading">
      <h2 id="house-favourites-heading" className="popular-cocktails-container__heading">House Favourites</h2>
      <div className="cocktail-grid">
        {cocktails.map((cocktail) => (
          <Link
            key={cocktail.idDrink}
            to={`/drink/${cocktail.idDrink}`}
            className="cocktail-card"
            aria-label={`View ${cocktail.strDrink} recipe`}
          >
            <img
              src={cocktail.strDrinkThumb}
              alt={`${cocktail.strDrink} cocktail`}
              className="cocktail-card__image"
              loading="lazy"
            />
            <div className="cocktail-card__name">{cocktail.strDrink}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default PopularDrinks;
