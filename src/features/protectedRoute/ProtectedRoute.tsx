import Spinner from '@/components/spinner';
import { useUserContext } from '@/context/UserContext/UserContext';
import { userAPI } from '@/features/user/api/user';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const {setUser} = useUserContext()


  const { data: userData, isPending } = userAPI.useGetUser({userID: 1} );


  if (isPending) {
    return <Spinner />
  }

  if (userData) {
    setUser(userData)
  }

  return <>{children}</>;
};

export default ProtectedRoute;
