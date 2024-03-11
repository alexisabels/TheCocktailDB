/* eslint-disable react/prop-types */
import React from 'react';
import './Card.css';
import { Link } from 'react-router-dom';

function Card({ drink }) {
  return (
    <Link key={drink.idDrink} to={`/drink/${drink.idDrink}`}>
      <div className="card_1">
        <a href={`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drink.idDrink}`} target="_blank" rel="noreferrer">
          <img alt="drink" src={`${drink.strDrinkThumb}`} />
          <h3>{drink.strDrink[0].toUpperCase() + drink.strDrink.slice(1)}</h3>
        </a>
      </div>
    </Link>
  );
}

export default Card;
