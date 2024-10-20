import LazyComponent from '@/components/lazyComponent';
import Signup from '@/features/user/components/Signup';

const SignupPage = () => {
  return (
    <LazyComponent>
      <Signup />
    </LazyComponent>
  );
};

export default SignupPage;
