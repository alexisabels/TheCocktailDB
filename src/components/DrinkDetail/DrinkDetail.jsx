import React, { useEffect, useState } from 'react';
import { getCocktailDetail } from '../../services/cocktailapi';
import DrinkIngredients from '../Ingredients/DrinkIngredients';

export default function DrinkDetail({ id }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    getCocktailDetail(id)
      .then((json) => {
        setData(json.drinks[0]); // Accede al primer elemento de la matriz de bebidas
      })
      .catch((error) => {
        console.error('Error fetching cocktail detail:', error);
      });
  }, [id]);

  return (
    <div className="drink-detail">
      {data && (
        <div className="drink-info">
          <div>Id: {data.idDrink}</div>
          <div>Nombre: {data.strDrink}</div>
          <div>Vaso: {data.strGlass}</div>
          <div>Instrucciones: {data.strInstructions}</div>
          <img src={data.strDrinkThumb} alt={data.strDrink} />
        </div>
      )}

      {data && <DrinkIngredients ingredients={data} />}
    </div>
  );
}
