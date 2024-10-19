import { useLocation, useNavigate } from 'react-router-dom';

const useNavigateWithParams = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const onNavigate = ({ pathname }: { pathname: string | number }) => {
    const searchParams = new URLSearchParams(location.search);

    if (typeof pathname === 'string') {
      navigate({
        pathname,
        search: searchParams.toString(),
      });
    } else if (typeof pathname === 'number') {
      navigate(pathname);
    }
  };

  return onNavigate;
};

export default useNavigateWithParams;
