import React from 'react';
import Card from '../Card/Card';
import { Link } from 'react-router-dom'


const CardList = ({ drinks }) => {
  return (
    <div className='card-list' >
      {drinks.map(drink =>
        <Link to={"/drink/" + drink.strDrink}>
          <Card drink={drink} key={drink.strDrink} />
        </Link>
      )}
    </div>
  )
};

export default CardList;