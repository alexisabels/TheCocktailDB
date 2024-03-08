import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';

export default function Main() {
  return (
    <>
      <div>
        <Link to="/">
          <h1>The Cocktail DB</h1>
        </Link>
        <ul>
          <li><Link to={'search'}>Search cocktails</Link></li>
        </ul>
      </div>
      <Outlet />
      <Footer /> 
    </>
  );
}
