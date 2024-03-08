import React from 'react';
import ReactDOM from 'react-dom';
import Search from './screens/Search/Search';
import Main from './screens/Main/Main';
import Error from './screens/Error/Error';
import Ingredients from './screens/Ingredients/Ingredients';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Details from './screens/Details/Details';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <Error />,
    children: [
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/ingredients/:ingredient",
        element: <Ingredients />
      },
      {
        path: "/drink/:idDrink",
        element: <Details />,
      }      
    ],
  },

]);

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById('root')
);

