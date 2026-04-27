/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable object-curly-newline */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCocktailByLetter } from '../../services/cocktailapi';
import CardList from '../CardList/CardList';
import usePageMeta from '../../hooks/usePageMeta';
import '../../screens/Ingredients/Ingredients.css';

const SITE_URL = 'https://cocktail.alexisabel.com';

function ListSchema({ letter, drinks }) {
  if (!drinks || drinks.length === 0) return null;
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      {
        '@type': 'ListItem',
        position: 2,
        name: `Cocktails starting with ${letter}`,
        item: `${SITE_URL}/cocktails/${letter}`,
      },
    ],
  };
  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Cocktails starting with ${letter}`,
    url: `${SITE_URL}/cocktails/${letter}`,
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

function CocktailsByLetter() {
  const [cocktails, setCocktails] = useState([]);
  const { letter } = useParams();
  const upper = letter ? letter.toUpperCase() : '';
  const count = cocktails.length;

  usePageMeta({
    title: count
      ? `${count} Cocktails That Start with ${upper} - Recipes & Ingredients`
      : `Cocktails That Start with ${upper} - Recipes & Ingredients`,
    description: `Browse ${count || 'every'} cocktail recipe that starts with the letter ${upper}. Classic and modern ${upper} cocktails with full ingredients, glassware and step-by-step method. Find your next ${upper} drink.`,
    path: `/cocktails/${letter}`,
  });

  useEffect(() => {
    const fetchCocktailsByLetter = async () => {
      try {
        const data = await getCocktailByLetter(letter);
        setCocktails(data.drinks || []);
      } catch (error) {
        console.error('Error fetching cocktails:', error);
      }
    };

    fetchCocktailsByLetter();
  }, [letter]);

  return (
    <section className="ingredients-screen">
      <ListSchema letter={upper} drinks={cocktails} />
      <p className="ingredients-screen__eyebrow">Browse the bar</p>
      <h1 className="ingredients-screen__heading">
        Cocktails beginning with
        {' '}
        <span>{upper}</span>
      </h1>
      {count > 0 && (
        <p className="ingredients-screen__count">
          {count}
          {' '}
          {count === 1 ? 'recipe' : 'recipes'}
        </p>
      )}
      <p className="ingredients-screen__intro">
        Every cocktail recipe that starts with the letter
        {' '}
        <strong>{upper}</strong>
        . Tap any drink to see the full ingredients, glassware and method.
      </p>
      {cocktails.length === 0 ? (
        <p className="no-results">No cocktails found.</p>
      ) : (
        <CardList drinks={cocktails} />
      )}
    </section>
  );
}

export default CocktailsByLetter;
