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
    <section className="random-cocktails-container" aria-labelledby="random-heading">
      <h2 id="random-heading" className="random-cocktails-container__heading">Tonight&apos;s Selection</h2>
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
            <div className="cocktail-name">{cocktail.strDrink}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default RandomCocktails;
