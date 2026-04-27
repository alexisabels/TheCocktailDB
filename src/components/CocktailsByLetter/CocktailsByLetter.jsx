/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCocktailByLetter } from '../../services/cocktailapi';
import CardList from '../CardList/CardList';
import '../../screens/Ingredients/Ingredients.css';

function CocktailsByLetter() {
  const [cocktails, setCocktails] = useState([]);
  const { letter } = useParams();

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
      <p className="ingredients-screen__eyebrow">Browse the bar</p>
      <h2 className="ingredients-screen__heading">
        Cocktails beginning with
        {' '}
        <span>{letter}</span>
      </h2>
      {cocktails.length === 0 ? (
        <p className="no-results">No cocktails found.</p>
      ) : (
        <CardList drinks={cocktails} />
      )}
    </section>
  );
}

export default CocktailsByLetter;
