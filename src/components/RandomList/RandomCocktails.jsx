import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getRandomCocktail } from '../../services/cocktailapi';
import './RandomCocktail.css';

const RANDOM_COUNT = 8;

function RandomCocktails() {
  const [cocktails, setCocktails] = useState([]);

  useEffect(() => {
    let cancelled = false;
    const requests = Array.from({ length: RANDOM_COUNT }, () => getRandomCocktail());
    Promise.all(requests)
      .then((results) => {
        if (cancelled) return;
        setCocktails(results.map((r) => r.drinks[0]).filter(Boolean));
      })
      .catch(() => {
        /* swallow — section will simply render empty */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (cocktails.length === 0) return null;

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
