import React from 'react';
import { useParams } from 'react-router-dom';
import DrinkDetail from '../../components/DrinkDetail/DrinkDetail';

export default function Details() {
  const { idDrink } = useParams();
  console.log("ID del cóctel:", idDrink);

  return <DrinkDetail id={idDrink} />;
}
