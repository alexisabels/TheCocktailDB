/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCocktailDetail } from '../../services/cocktailapi';
import usePageMeta from '../../hooks/usePageMeta';
import './DrinkDetail.css';

function getIngredientList(drink) {
  if (!drink) return [];
  return Object.keys(drink)
    .filter((key) => key.startsWith('strIngredient') && drink[key])
    .map((key) => {
      const idx = key.replace('strIngredient', '');
      const measure = drink[`strMeasure${idx}`];
      return {
        name: drink[key],
        measure: measure ? measure.trim() : '',
      };
    });
}

function RecipeSchema({ drink }) {
  if (!drink) return null;
  const ingredients = getIngredientList(drink).map((i) => (i.measure ? `${i.measure} ${i.name}` : i.name));
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
    recipeIngredient: ingredients,
    recipeInstructions: drink.strInstructions
      ? [{ '@type': 'HowToStep', text: drink.strInstructions }]
      : undefined,
    inLanguage: 'en',
  };

  return (
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
      .then((json) => setData(json.drinks[0]))
      .catch((error) => console.error('Error fetching cocktail detail:', error));
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

  if (!data) return <div className="recipe-empty" />;

  const ingredients = getIngredientList(data);
  const meta = [data.strCategory, data.strAlcoholic, data.strGlass].filter(Boolean);

  return (
    <article className="recipe">
      <RecipeSchema drink={data} />

      <header className="recipe__hero">
        <p className="recipe__eyebrow">The Recipe</p>
        <h1 className="recipe__name">
          {data.strDrink}
        </h1>
        {meta.length > 0 && (
          <p className="recipe__meta">
            {meta.map((m, i) => (
              <React.Fragment key={m}>
                {i > 0 && <span className="recipe__meta-sep" aria-hidden="true">·</span>}
                <span>{m}</span>
              </React.Fragment>
            ))}
          </p>
        )}
        <img
          className="recipe__image"
          src={data.strDrinkThumb}
          alt={`${data.strDrink} cocktail served in a ${data.strGlass}`}
          loading="lazy"
        />
      </header>

      <div className="recipe__body">
        <section className="recipe__ingredients" aria-labelledby="recipe-ingredients">
          <h2 id="recipe-ingredients" className="recipe__section-title">
            <span>Ingredients</span>
          </h2>
          <ul className="recipe__ingredient-list">
            {ingredients.map((ing) => (
              <li key={ing.name} className="recipe__ingredient">
                {ing.measure && <span className="recipe__measure">{ing.measure}</span>}
                <Link to={`/ingredients/${ing.name}`} className="recipe__ingredient-name">
                  {ing.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="recipe__method" aria-labelledby="recipe-method">
          <h2 id="recipe-method" className="recipe__section-title">
            <span>Method</span>
          </h2>
          <p className="recipe__instructions">{data.strInstructions}</p>
        </section>
      </div>
    </article>
  );
}
