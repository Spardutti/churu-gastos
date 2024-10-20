import LazyComponent from '@/components/lazyComponent';
import Login from '@/features/user/components/Login';

const Home = () => {
  return (
    <LazyComponent>
      <Login />
    </LazyComponent>
  );
};

export default Home;
