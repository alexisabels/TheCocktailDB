import React from 'react';
import { useParams } from 'react-router-dom';
import DrinkDetail from '../../components/DrinkDetail/DrinkDetail';


export default function Details() {

  const { idDrink } = useParams();
  console.log("hola")
  console.log(idDrink);

  return (
    <DrinkDetail id={idDrink} />
  )
}
