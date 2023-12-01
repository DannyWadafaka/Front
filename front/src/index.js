import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from './Routes/Login';
import Select from './Routes/Select';
import Home from './Routes/Home';
import Protected from './Routes/Protected';
import { AuthProvider } from './Auth/AuthProvider.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>
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
