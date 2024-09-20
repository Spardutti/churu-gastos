import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import routes from '@/routes/routes.ts';
import LazyComponent from '@/components/lazyComponent';
import ProtectedRoute from '@/features/protectedRoute';
import Login from '@/features/user/components/Login';
import SignupPage from '@/routes/SignupPage';
import Dashboard from '@/routes/Dashboard';
import Category from '@/routes/Category';

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
      path: routes.CATEGORY({ categoryID: ':categoryID' }),
      element: (
        <LazyComponent>
          <ProtectedRoute>
            <Category />
          </ProtectedRoute>
        </LazyComponent>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
