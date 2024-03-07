import React from 'react';
import './Card.css';


const Card = ({ drink }) => {
  return (
    <div className="card">
      <a href={`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drink.id}`} target="_blank" rel="noreferrer">
        <img alt="drink" src={`${drink.strDrinkThumb}`} />
        <h3>{drink.strDrink[0].toUpperCase() + drink.strDrink.slice(1)}</h3>
      </a>
    </div>);
}

export default Card;