/* eslint-disable react/jsx-indent */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable object-curly-newline */
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getCocktailsByIngredient } from '../../services/cocktailapi';
import usePageMeta from '../../hooks/usePageMeta';
import './Ingredients.css';

const SITE_URL = 'https://cocktail.alexisabel.com';

function ListSchema({ ingredient, drinks }) {
  if (!drinks || drinks.length === 0) return null;
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      {
        '@type': 'ListItem',
        position: 2,
        name: `Cocktails with ${ingredient}`,
        item: `${SITE_URL}/ingredients/${ingredient}`,
      },
    ],
  };
  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${ingredient} cocktail recipes`,
    url: `${SITE_URL}/ingredients/${ingredient}`,
    inLanguage: 'en',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: drinks.length,
      itemListElement: drinks.map((d, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${SITE_URL}/drink/${d.idDrink}`,
        name: d.strDrink,
        image: d.strDrinkThumb,
      })),
    },
  };
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />
    </>
  );
}

function Ingredients() {
  const { ingredient } = useParams();
  const [cocktails, setCocktails] = useState([]);
  const safeList = cocktails || [];
  const count = safeList.length;
  const titleCase = ingredient
    ? ingredient.charAt(0).toUpperCase() + ingredient.slice(1).toLowerCase()
    : '';

  usePageMeta({
    title: count
      ? `${count} ${titleCase} Cocktails - Drinks Made with ${titleCase}`
      : `${titleCase} Cocktails - Drinks Made with ${titleCase}`,
    description: `Browse ${count || 'every'} cocktail recipe made with ${titleCase}. Classic and modern ${titleCase} cocktails with full ingredients, glassware and method. Discover what to mix with ${titleCase}.`,
    path: `/ingredients/${ingredient}`,
  });

  useEffect(() => {
    const fetchCocktails = async () => {
      try {
        const data = await getCocktailsByIngredient(ingredient);
        setCocktails(data.drinks);
      } catch (error) {
        console.error('Error fetching cocktails by ingredient:', error);
      }
    };

    fetchCocktails();
  }, [ingredient]);

  return (
    <section className="ingredients-screen">
      <ListSchema ingredient={titleCase} drinks={safeList} />
      <p className="ingredients-screen__eyebrow">Crafted with</p>
      <h1 className="ingredients-screen__heading">
        Cocktails with
        {' '}
        <span>{ingredient}</span>
      </h1>
      {count > 0 && (
        <p className="ingredients-screen__count">
          {count}
          {' '}
          {count === 1 ? 'recipe' : 'recipes'}
        </p>
      )}
      <p className="ingredients-screen__intro">
        Every cocktail in our database that uses
        {' '}
        <strong>{titleCase}</strong>
        . Tap any drink to see the full recipe with measures, glassware and method.
      </p>
      <ul className="ingredient-cocktails">
        {safeList.map((cocktail) => (
          <li key={cocktail.idDrink} className="ingredient-cocktail">
            <Link to={`/drink/${cocktail.idDrink}`}>
              <img src={cocktail.strDrinkThumb} alt={`${cocktail.strDrink} cocktail`} loading="lazy" />
              <h3>{cocktail.strDrink}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Ingredients;
