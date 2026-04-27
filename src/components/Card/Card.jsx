/* eslint-disable react/prop-types */
import React from 'react';
import './Card.css';

function Card({ drink }) {
  return (
    <div className="card">
      <img alt={drink.strDrink} src={drink.strDrinkThumb} className="card__image" />
      <h3 className="card__title">
        {drink.strDrink[0].toUpperCase() + drink.strDrink.slice(1)}
      </h3>
    </div>
  );
}

export default Card;
