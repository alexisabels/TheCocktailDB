/* eslint-disable react/prop-types */
import React from 'react';
import './Card.css';

function Card({ drink }) {
  return (
    <article className="card">
      <img
        alt={`${drink.strDrink} cocktail`}
        src={drink.strDrinkThumb}
        className="card__image"
        loading="lazy"
      />
      <h3 className="card__title">
        {drink.strDrink[0].toUpperCase() + drink.strDrink.slice(1)}
      </h3>
    </article>
  );
}

export default Card;
