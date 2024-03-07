import React from 'react';
import { useParams } from 'react-router-dom';
import DrinkDetail from '../../components/DrinkDetail/DrinkDetail';


export default function Details() {

  const { drinkName } = useParams();
  console.log(drinkName);

  return (
    <DrinkDetail name={drinkName} />
  )
}
