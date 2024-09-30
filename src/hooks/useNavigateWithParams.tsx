import { useLocation, useNavigate } from 'react-router-dom';

const useNavigateWithParams = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const onNavigate = ({ pathname }: { pathname: string }) => {
    const searchParams = new URLSearchParams(location.search);
    navigate({
      pathname,
      search: searchParams.toString(),
    });
  };
  return onNavigate;
};

export default useNavigateWithParams;
