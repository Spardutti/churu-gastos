import { lazy } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import routes from '@/routes/routes.ts';
import LazyComponent from '@/components/lazyComponent';
import ProtectedRoute from '@/features/protectedRoute';
import Insight from '@/routes/Insight';

const Dashboard = lazy(() => import('@/routes/Dashboard'));
const SignupPage = lazy(() => import('@/features/user/components/Signup/Signup'));
const Login = lazy(() => import('@/features/user/components/Login/Login'));

const App = () => {
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
      path: routes.INSIGHTS(),
      element: (
        <LazyComponent>
          <ProtectedRoute>
            <Insight />
          </ProtectedRoute>
        </LazyComponent>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
