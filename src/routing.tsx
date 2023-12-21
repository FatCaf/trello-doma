import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Board from './pages/Board';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/board',
    element: <Board />,
  },
]);
