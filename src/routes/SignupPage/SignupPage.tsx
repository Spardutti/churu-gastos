import LazyComponent from '@/components/lazyComponent';
import Signup from '@/features/user/components/Signup';
import Layout from '@/layout/Layout';


const SignupPage = () => {
  return (
    <LazyComponent>
      <Layout>
        <Signup />
      </Layout>
    </LazyComponent>
  );
};

export default SignupPage;
