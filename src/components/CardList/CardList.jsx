/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../Card/Card';
import './CardList.css';

function CardList({ drinks }) {
  return (
    <div className="card-list">
      {drinks.map((drink) => (
        <Link key={drink.idDrink} className="col-3" to={`/drink/${drink.idDrink}`}>
          <Card drink={drink} />
        </Link>
      ))}
    </div>
  );
}

export default CardList;
