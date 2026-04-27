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
      <h1 style={{ fontSize: '3rem', margin: 0, color: 'var(--color-link-hover)' }}>404</h1>
      <p style={{ marginTop: '0.5rem', fontSize: '1.1rem' }}>
        Esta ruta no existe.
      </p>
      <Link
        to="/"
        style={{
          marginTop: '1.5rem',
          backgroundColor: 'var(--color-accent)',
          color: '#fff',
          padding: '0.6rem 1.2rem',
          borderRadius: '6px',
          textDecoration: 'none',
          fontWeight: 600,
        }}
      >
        Volver al inicio
      </Link>
    </div>
  );
}
