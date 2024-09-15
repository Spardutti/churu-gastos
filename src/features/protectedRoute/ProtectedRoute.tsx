import Spinner from '@/components/spinner';
import { useUserContext } from '@/context/UserContext/UserContext';
import { useEffect } from 'react';
import { userAPI } from '@/features/user/api/user';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { setUser } = useUserContext();
  const { data: userData, isPending } = userAPI.useGetUser({ userID: 1 });

  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [userData, setUser]);

  if (isPending) {
    return <Spinner />;
  }

  return children;
};

export default ProtectedRoute;
