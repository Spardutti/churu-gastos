import ExpenseTracker from '@/features/dashboard/components/ExpenseTracker';
import CreateItemForm from '@/features/items/components/CreateItemForm';
import { lazy } from 'react';
import { useMediaQuery } from 'react-responsive';
const Layout = lazy(() => import('@/layout/Layout'));

const Dashboard = () => {
  const isDesktop = useMediaQuery({
    query: '(min-width: 875px)',
  });

  return (
    <Layout>
      <ExpenseTracker />
      {/* <Form /> */}
      <CreateItemForm />
    </Layout>
  );
};

export default Dashboard;
