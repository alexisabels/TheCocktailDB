import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useLikes from '../../hooks/useLikes';
import usePageMeta from '../../hooks/usePageMeta';
import { getCocktailDetail } from '../../services/cocktailapi';
import CardList from '../../components/CardList/CardList';
import './Favorites.css';

export default function Favorites() {
  const { liked } = useLikes();
  const [drinks, setDrinks] = useState([]);
  const [status, setStatus] = useState('idle');

  usePageMeta({
    title: 'Your Favorite Cocktails',
    description: 'The cocktail recipes you have saved as favorites in this browser.',
    path: '/favorites',
  });

  useEffect(() => {
    let cancelled = false;
    if (liked.length === 0) {
      setDrinks([]);
      setStatus('empty');
      return undefined;
    }
    setStatus('loading');
    Promise.all(liked.map((id) => getCocktailDetail(id).catch(() => null)))
      .then((results) => {
        if (cancelled) return;
        const found = results
          .map((r) => (r && r.drinks ? r.drinks[0] : null))
          .filter(Boolean);
        setDrinks(found);
        setStatus('done');
      })
      .catch(() => {
        if (!cancelled) setStatus('error');
      });
    return () => {
      cancelled = true;
    };
  }, [liked]);

  return (
    <section className="favorites">
      <header className="favorites__header">
        <p className="favorites__eyebrow">Your Selection</p>
        <h1 className="favorites__title">Favorites</h1>
        <p className="favorites__subtitle">
          The cocktails you have saved on this device.
        </p>
      </header>

      {status === 'empty' && (
        <div className="favorites__empty">
          <p>You haven&apos;t saved any cocktails yet.</p>
          <p>
            Tap the heart on any recipe and it will live here.
            {' '}
            <Link to="/" className="favorites__empty-link">Browse the bar</Link>
          </p>
        </div>
      )}

      {status === 'loading' && (
        <div className="favorites__empty" aria-busy="true">
          <p>Pouring your favorites…</p>
        </div>
      )}

      {status === 'error' && (
        <div className="favorites__empty">
          <p>Could not load your favorites. Please try again.</p>
        </div>
      )}

      {status === 'done' && drinks.length > 0 && <CardList drinks={drinks} />}
    </section>
  );
}
