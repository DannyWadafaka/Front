import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from './Routes/Login';
import Select from './Routes/Select';
import Home from './Routes/Home';
import Inventario from './Routes/Inventario.js';
import Editarinv from './Routes/Editarinv.js';
import Realizaredicion from './Routes/Realizaredicion.js';

import Protected from './Routes/Protected';
import { AuthProvider } from './Auth/AuthProvider.tsx';
import Registroventas from './Routes/Registroventas.js';
import AgregarItem from './Routes/Agregaritem.js';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>
  },
  {
    path:  `/realizaredicion/:id`,
    element: <Realizaredicion/>
  },
  {
    path: "/agregaritem",
    element: <AgregarItem/>
  },
  {
    path: "/inventario",
    element: <Inventario/>
  },
  {
    path: "/registroventas",
    element: <Registroventas/>
  },
  {
    path: "/editarinv",
    element: <Editarinv/>
  },

  {
    path: "/",
    element: <Protected/>,
    children: [
      {
        path: "/select",
        element: <Select/>
      },
    ],
  },
  {
    path: "/home",
    element: <Home/>
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
