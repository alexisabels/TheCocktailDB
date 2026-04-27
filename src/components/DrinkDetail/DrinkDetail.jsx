/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { getCocktailDetail } from '../../services/cocktailapi';
import DrinkIngredients from '../Ingredients/DrinkIngredients';
import usePageMeta from '../../hooks/usePageMeta';
import './DrinkDetail.css';

function getIngredientList(drink) {
  return Object.keys(drink)
    .filter((key) => key.startsWith('strIngredient') && drink[key])
    .map((key) => {
      const idx = key.replace('strIngredient', '');
      const measure = drink[`strMeasure${idx}`];
      return measure ? `${measure.trim()} ${drink[key]}` : drink[key];
    });
}

function RecipeSchema({ drink }) {
  if (!drink) return null;
  const ingredients = getIngredientList(drink);
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: drink.strDrink,
    image: drink.strDrinkThumb,
    description: `${drink.strDrink} cocktail recipe with full ingredients and method. Served in a ${drink.strGlass}.`,
    recipeCategory: drink.strCategory || 'Cocktail',
    recipeCuisine: 'Cocktail',
    keywords: [drink.strDrink, drink.strCategory, drink.strAlcoholic, 'cocktail recipe']
      .filter(Boolean)
      .join(', '),
    suitableForDiet: drink.strAlcoholic === 'Non alcoholic'
      ? ['https://schema.org/LowAlcoholDiet']
      : undefined,
    recipeIngredient: ingredients,
    recipeInstructions: drink.strInstructions
      ? [{ '@type': 'HowToStep', text: drink.strInstructions }]
      : undefined,
    inLanguage: 'en',
  };

  return (
    // eslint-disable-next-line react/no-danger
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

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

  usePageMeta({
    title: data
      ? `${data.strDrink} Recipe - Ingredients & Method`
      : 'Cocktail Recipe',
    description: data
      ? `Learn how to make a ${data.strDrink}: ingredients, glassware (${data.strGlass}) and step-by-step method.`
      : 'Cocktail recipe with full ingredients and method.',
    image: data ? data.strDrinkThumb : undefined,
    path: `/drink/${id}`,
  });

  return (
    <article>
      <RecipeSchema drink={data} />
      <div className="drink-detail-container text-white">
        {data && (
          <div className="drink-info-left">
            <p className="drink-eyebrow">The Recipe</p>
            <h1 className="drink-name">{data.strDrink}</h1>
            <img
              className="drink-image"
              src={data.strDrinkThumb}
              alt={`${data.strDrink} cocktail served in a ${data.strGlass}`}
              loading="lazy"
            />
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
            <h2 className="drink-heading">Glassware</h2>
            <p className="drink-text">{data.strGlass}</p>
          </div>
          <div className="drink-instructions">
            <h2 className="drink-heading">Method</h2>
            <p className="drink-text drink-text--instructions">
              {data.strInstructions}
            </p>
          </div>
        </div>
      )}
    </article>
  );
}
