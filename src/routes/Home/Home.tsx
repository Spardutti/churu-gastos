import LazyComponent from '@/components/lazyComponent';
import Login from '@/features/user/components/Login';

import Layout from '@/layout/Layout';

const Home = () => {
  return (
    <LazyComponent>
      <Layout>
        <Login />
      </Layout>
    </LazyComponent>
  );
};

export default Home;
