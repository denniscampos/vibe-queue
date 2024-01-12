import React from 'react';
import ReactDOM from 'react-dom/client';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Root } from '@/routes/root';
import ErrorPage from './ErrorPage.tsx';
import { Source } from './routes/source.tsx';
import { Login } from './routes/login.tsx';
import { Settings } from './routes/settings.tsx';
import { Home, loader as homeLoader } from './routes/home.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        index: true,
        loader: homeLoader,
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'source',
        element: <Source />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
      {
        path: 'callback',
        loader: homeLoader,
        element: <Home />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Theme appearance="dark" accentColor="grass" grayColor="sand">
      <RouterProvider router={router} />
    </Theme>
  </React.StrictMode>,
);
