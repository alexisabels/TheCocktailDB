import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCocktailDetail } from '../../services/cocktailapi';
import './PopularDrinks.css';

const FEATURED_IDS = [
  '178365', // Gin Tonic
  '178366', // Gin Lemon
  '11007', // Margarita
  '11202', // Caipirinha
  '11001', // Old Fashioned
  '11064', // Banana Daiquiri
  '13020', // Sangria
  '13206', // Caipirissima
];

function PopularDrinks() {
  const [cocktails, setCocktails] = useState([]);

  useEffect(() => {
    let cancelled = false;
    Promise.all(FEATURED_IDS.map((id) => getCocktailDetail(id)))
      .then((results) => {
        if (cancelled) return;
        setCocktails(results.map((r) => r.drinks[0]).filter(Boolean));
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  if (cocktails.length === 0) return null;

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
