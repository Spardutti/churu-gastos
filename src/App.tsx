import { lazy } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import routes from '@/routes/routes.ts';
import LazyComponent from '@/components/lazyComponent';
import ProtectedRoute from '@/features/protectedRoute';
import Layout from '@/layout/Layout';

const Dashboard = lazy(() => import('@/routes/Dashboard'));
const SignupPage = lazy(() => import('@/features/user/components/Signup/Signup'));
const Login = lazy(() => import('@/features/user/components/Login/Login'));
const Category = lazy(() => import('@/routes/Category'));
const Extras = lazy(() => import('@/routes/Extras'));
const Cards = lazy(() => import('@/routes/Cards'));
const Accounts = lazy(() => import('@/routes/Accounts'));
const AccountDetail = lazy(() => import('@/routes/AccountDetail'));

const router = createBrowserRouter([
  {
    path: routes.LOGIN(),
    element: (
      <LazyComponent>
        <Login />
      </LazyComponent>
    ),
  },

  {
    path: '/',
    element: <Navigate to={routes.DASHBOARD()} replace />,
  },

  {
    path: routes.SIGNUP(),
    element: (
      <LazyComponent>
        <SignupPage />
      </LazyComponent>
    ),
  },

  {
    element: (
      <LazyComponent>
        <ProtectedRoute>
          <Layout />  
        </ProtectedRoute>
      </LazyComponent>
    ),
    children: [
      {
        path: routes.DASHBOARD(),
        element: (
          <LazyComponent>
            <Dashboard />
          </LazyComponent>
        ),
      },
      {
        path: routes.CATEGORY({ categoryID: ':categoryID' }),
        element: (
          <LazyComponent>
            <Category />
          </LazyComponent>
        ),
      },
      {
        path: routes.EXTRAS(),
        element: (
          <LazyComponent>
            <Extras />
          </LazyComponent>
        ),
      },
      {
        path: routes.CARDS(),
        element: (
          <LazyComponent>
            <Cards />
          </LazyComponent>
        ),
      },
      {
        path: routes.ACCOUNTS(),
        element: (
          <LazyComponent>
            <Accounts />
          </LazyComponent>
        ),
      },
      {
        path: routes.ACCOUNT_DETAILS({ accountId: ':accountId' }),
        element: (
          <LazyComponent>
            <AccountDetail />
          </LazyComponent>
        ),
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
