import React, { lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '@/store/store.ts';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from '@/routes/routes.ts';
import LazyComponent from '@/components/lazyComponent';

import './index.css';
import ProtectedRoute from '@/features/protectedRoute';

const Dashboard = lazy(() => import('@/routes/Dashboard'));
const Home = lazy(() => import('@/routes/Home'));

const router = createBrowserRouter([
  {
    path: routes.HOME(),
    element: (
      <LazyComponent>
        <Home />
      </LazyComponent>
    ),
  },
  {
    path: routes.DASHBOARD(),
    element: (
      <LazyComponent>
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </LazyComponent>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
