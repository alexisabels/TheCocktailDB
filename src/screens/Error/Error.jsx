import React from 'react';
import { Link } from 'react-router-dom';

export default function Error() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--color-bg)',
        color: 'var(--color-text)',
        padding: '2rem',
        textAlign: 'center',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          letterSpacing: '0.4em',
          textTransform: 'uppercase',
          color: 'var(--color-accent)',
          margin: 0,
          fontSize: '0.9rem',
        }}
      >
        Page not found
      </p>
      <h1
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(3rem, 10vw, 5rem)',
          margin: '0.5rem 0 0',
          color: 'var(--color-text)',
          letterSpacing: '0.05em',
        }}
      >
        404
      </h1>
      <p
        style={{
          marginTop: '1rem',
          fontSize: '1.1rem',
          color: 'var(--color-text-soft)',
          maxWidth: '480px',
          fontStyle: 'italic',
          fontFamily: 'var(--font-display)',
        }}
      >
        The page you&apos;re looking for is not on the menu.
      </p>
      <Link
        to="/"
        style={{
          marginTop: '2rem',
          color: 'var(--color-text)',
          padding: '0.55rem 1.4rem',
          border: '1px solid var(--color-divider)',
          borderRadius: 'var(--radius-sm)',
          textDecoration: 'none',
          fontFamily: 'var(--font-display)',
          fontWeight: 500,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
        }}
      >
        Return to the bar
      </Link>
    </div>
  );
}
