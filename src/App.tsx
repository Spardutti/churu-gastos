import { lazy } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import routes from '@/routes/routes.ts';
import LazyComponent from '@/components/lazyComponent';
import ProtectedRoute from '@/features/protectedRoute';

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
    path: routes.DASHBOARD(),
    element: (
      <LazyComponent>
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </LazyComponent>
    ),
  },
  {
    path: routes.CATEGORY({ categoryID: ':categoryID' }),
    element: (
      <LazyComponent>
        <ProtectedRoute>
          <Category />
        </ProtectedRoute>
      </LazyComponent>
    ),
  },
  {
    path: routes.EXTRAS(),
    element: (
      <LazyComponent>
        <ProtectedRoute>
          <Extras />
        </ProtectedRoute>
      </LazyComponent>
    ),
  },
  {
    path: routes.CARDS(),
    element: (
      <LazyComponent>
        <ProtectedRoute>
          <Cards />
        </ProtectedRoute>
      </LazyComponent>
    ),
  },
  {
    path: routes.ACCOUNTS(),
    element: (
      <LazyComponent>
        <ProtectedRoute>
          <Accounts />
        </ProtectedRoute>
      </LazyComponent>
    ),
  },
  {
    path: routes.ACCOUNT_DETAILS({ accountId: ':accountId' }),
    element: (
      <LazyComponent>
        <ProtectedRoute>
          <AccountDetail />
        </ProtectedRoute>
      </LazyComponent>
    ),
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
