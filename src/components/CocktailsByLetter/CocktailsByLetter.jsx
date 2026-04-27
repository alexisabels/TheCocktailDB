/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCocktailByLetter } from '../../services/cocktailapi';
import CardList from '../CardList/CardList';
import usePageMeta from '../../hooks/usePageMeta';
import '../../screens/Ingredients/Ingredients.css';

function CocktailsByLetter() {
  const [cocktails, setCocktails] = useState([]);
  const { letter } = useParams();
  const upper = letter ? letter.toUpperCase() : '';

  usePageMeta({
    title: `Cocktails Beginning with ${upper}`,
    description: `Browse every cocktail recipe that begins with the letter ${upper}. Classic and modern drinks listed alphabetically with full recipes.`,
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
      <h1 className="ingredients-screen__heading">
        Cocktails beginning with
        {' '}
        <span>{upper}</span>
      </h1>
      {cocktails.length === 0 ? (
        <p className="no-results">No cocktails found.</p>
      ) : (
        <CardList drinks={cocktails} />
      )}
    </section>
  );
}

export default CocktailsByLetter;
