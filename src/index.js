/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Search from './screens/Search/Search';
import Main from './screens/Main/Main';
import Error from './screens/Error/Error';
import Ingredients from './screens/Ingredients/Ingredients';
import Details from './screens/Details/Details';
import CocktailsByLetter from './components/CocktailsByLetter/CocktailsByLetter';
import Home from './screens/Home/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/search',
        element: <Search />,
      },
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/ingredients/:ingredient',
        element: <Ingredients />,
      },
      {
        path: '/drink/:idDrink',
        element: <Details />,
      },
      {
        path: '/cocktails/:letter',
        element: <CocktailsByLetter />,
      },
    ],
  },

]);

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById('root'),
);
