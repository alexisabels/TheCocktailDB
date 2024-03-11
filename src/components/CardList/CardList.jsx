import React from 'react';
import Card from '../Card/Card';
import { Link } from 'react-router-dom';
import './CardList.css'
const CardList = ({ drinks }) => {
  return (
    <div className='card-list'>
      {drinks.map(drink =>
        <Link key={drink.idDrink} to={"/drink/" + drink.idDrink}>
          <Card drink={drink} />
        </Link>
      )}
    </div>
  );
};

export default CardList;
