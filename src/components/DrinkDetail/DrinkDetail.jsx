/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable object-curly-newline */
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

const SITE_URL = 'https://cocktail.alexisabel.com';

function RecipeSchema({ drink }) {
  if (!drink) return null;
  const ingredients = getIngredientList(drink).map((i) => (i.measure ? `${i.measure} ${i.name}` : i.name));
  const recipe = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    '@id': `${SITE_URL}/drink/${drink.idDrink}#recipe`,
    name: drink.strDrink,
    headline: `${drink.strDrink} Cocktail Recipe`,
    image: [drink.strDrinkThumb],
    description: `How to make a ${drink.strDrink}: full ingredients with measures, glassware (${drink.strGlass}) and step-by-step method for the classic ${drink.strDrink} cocktail.`,
    recipeCategory: drink.strCategory || 'Cocktail',
    recipeCuisine: 'Cocktail',
    keywords: [
      drink.strDrink,
      `${drink.strDrink} recipe`,
      `how to make a ${drink.strDrink}`,
      `${drink.strDrink} cocktail`,
      `${drink.strDrink} ingredients`,
      drink.strCategory,
      drink.strAlcoholic,
      'cocktail recipe',
    ]
      .filter(Boolean)
      .join(', '),
    recipeYield: '1 serving',
    prepTime: 'PT5M',
    totalTime: 'PT5M',
    cookingMethod: drink.strCategory === 'Shot' ? 'Build' : 'Mix',
    suitableForDiet: drink.strAlcoholic === 'Non alcoholic'
      ? 'https://schema.org/LowAlcoholDiet'
      : undefined,
    recipeIngredient: ingredients,
    recipeInstructions: drink.strInstructions
      ? drink.strInstructions
        .split(/\.(?:\s+|$)/)
        .map((s) => s.trim())
        .filter(Boolean)
        .map((text, i) => ({ '@type': 'HowToStep', position: i + 1, text: `${text}.` }))
      : undefined,
    datePublished: drink.dateModified
      ? drink.dateModified.slice(0, 10)
      : '2024-01-01',
    dateModified: drink.dateModified
      ? drink.dateModified.slice(0, 10)
      : new Date().toISOString().slice(0, 10),
    author: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'The Cocktail Compendium',
    },
    publisher: { '@id': `${SITE_URL}/#organization` },
    isPartOf: { '@id': `${SITE_URL}/#website` },
    mainEntityOfPage: `${SITE_URL}/drink/${drink.idDrink}`,
    inLanguage: 'en',
    url: `${SITE_URL}/drink/${drink.idDrink}`,
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      {
        '@type': 'ListItem',
        position: 2,
        name: drink.strDrink,
        item: `${SITE_URL}/drink/${drink.idDrink}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(recipe) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </>
  );
}

export default function DrinkDetail({ id }) {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    getCocktailDetail(id)
      .then((json) => {
        if (cancelled) return;
        const drink = json && json.drinks && json.drinks[0];
        if (!drink) {
          setData(null);
          setStatus('not-found');
          return;
        }
        setData(drink);
        setStatus('done');
      })
      .catch(() => {
        if (cancelled) return;
        setStatus('error');
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  usePageMeta({
    title: data
      ? `How to Make a ${data.strDrink} - ${data.strDrink} Recipe`
      : 'Cocktail Recipe',
    description: data
      ? `How to make a ${data.strDrink}: full ingredients with measures, glassware (${data.strGlass}) and step-by-step method. The classic ${data.strDrink} cocktail recipe.`
      : 'Cocktail recipe with full ingredients and method.',
    image: data ? data.strDrinkThumb : undefined,
    path: `/drink/${id}`,
    type: 'article',
  });

  if (status === 'loading') {
    return <div className="recipe-empty" aria-busy="true" />;
  }

  if (status === 'not-found') {
    return (
      <div className="recipe-empty recipe-empty--message">
        <p>This cocktail is not in the bar. Try the search or browse by letter.</p>
      </div>
    );
  }

  if (status === 'error' || !data) {
    return (
      <div className="recipe-empty recipe-empty--message">
        <p>Could not load this cocktail. Please try again.</p>
      </div>
    );
  }

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
          width="380"
          height="380"
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
