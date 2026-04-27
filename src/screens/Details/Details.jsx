import React from 'react';
import { useParams } from 'react-router-dom';
import DrinkDetail from '../../components/DrinkDetail/DrinkDetail';

export default function Details() {
  const { idDrink } = useParams();

  return <DrinkDetail id={idDrink} />;
}
