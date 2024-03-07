import React from 'react';
import ReactDOM from 'react-dom';
import Search from './screens/Search/Search';
import Main from './screens/Main/Main';
import Error from './screens/Error/Error';
import Ingredients from './screens/Ingredients/Ingredients';
import Information from './screens/Information/Information';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Information />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/ingredients",
        element: <Ingredients />
      },
      
    ],
  },

]);

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById('root')
);

