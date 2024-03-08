import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCocktailByLetter } from '../../services/cocktailapi';
import CardList from '../../components/CardList/CardList';

const CocktailsByLetter = () => {
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
    <div className="cocktails-by-letter">
      <h2>Cocktails starting with letter "{letter}"</h2>
      <CardList drinks={cocktails} />
    </div>
  );
};

export default CocktailsByLetter;
