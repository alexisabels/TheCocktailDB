/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { getCocktailDetail } from '../../services/cocktailapi';
import DrinkIngredients from '../Ingredients/DrinkIngredients';
import './DrinkDetail.css';

export default function DrinkDetail({ id }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    getCocktailDetail(id)
      .then((json) => {
        setData(json.drinks[0]);
      })
      .catch((error) => {
        console.error('Error fetching cocktail detail:', error);
      });
  }, [id]);

  return (
    <div>
      <div className="drink-detail-container text-white">
        {data && (
          <div className="drink-info-left">
            <div className="drink-name">{data.strDrink}</div>
            <img className="drink-image" src={data.strDrinkThumb} alt={data.strDrink} />
          </div>
        )}

        {data && (
          <div className="drink-info-right">
            <DrinkIngredients ingredients={data} />
          </div>
        )}
      </div>
      {data && (
        <div className="drink-additional-info">
          <div className="drink-glass info-center">
            <h1 className="drink-heading">Vaso:</h1>
            <p className="drink-text">{data.strGlass}</p>
          </div>
          <div className="drink-instructions">
            <h1 className="drink-heading">Instrucciones:</h1>
            <p className="drink-text">{data.strInstructions}</p>
          </div>
        </div>
      )}
    </div>
  );
}
