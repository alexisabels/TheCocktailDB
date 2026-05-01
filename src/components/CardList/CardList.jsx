/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../Card/Card';
import LikeButton from '../LikeButton/LikeButton';
import './CardList.css';

function CardList({ drinks }) {
  return (
    <div className="card-list">
      {drinks.map((drink) => (
        <div key={drink.idDrink} className="card-list__item">
          <Link className="card-list__link" to={`/drink/${drink.idDrink}`}>
            <Card drink={drink} />
          </Link>
          <LikeButton
            drinkId={drink.idDrink}
            drinkName={drink.strDrink}
            variant="card"
          />
        </div>
      ))}
    </div>
  );
}

export default CardList;
