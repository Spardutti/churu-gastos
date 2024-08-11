import { strings } from '@/constants/strings';
import { setUser } from '@/features/user/store/userSlice';
import { lazy, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from '@/routes/routes.ts';
import LazyComponent from '@/components/lazyComponent';
import ProtectedRoute from '@/features/protectedRoute';
const Dashboard = lazy(() => import('@/routes/Dashboard'));
const Home = lazy(() => import('@/routes/Home'));

interface AppProps {}

const App = () => {
  const dispatch = useDispatch();

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

  useEffect(() => {
    const token = localStorage.getItem(strings.token);
    if (token) {
      dispatch(setUser({ email: '', token }));
    }
  }, [dispatch]);

  return <RouterProvider router={router} />;
};

export default App;
