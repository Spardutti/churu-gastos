import LazyComponent from '@/components/lazyComponent';
import Tab from '@/components/tab';
import Login from '@/features/user/components/Login';
import Signup from '@/features/user/components/Signup';
import DesktopLayout from '@/layout/DesktopLayout';

interface HomeProps {}

const tabs = [<Login key={0} />, <Signup key={1} />];
const headers = ['Login', 'Signup'];
const Home = () => {
  return (
    <LazyComponent>
      <DesktopLayout>
        <div className="flex flex-grow px-4 py-2 items-center justify-center">
          <Tab tabs={tabs} headers={headers} />
        </div>
      </DesktopLayout>
    </LazyComponent>
  );
};

export default Home;
