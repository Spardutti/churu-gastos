import CreateCategoryForm from '@/features/category/components/CreateCategoryForm/CreateCategoryForm';
import CreateCategoryBudgetForm from '@/features/categoryBudget/components/CreateCategoryBudgetForm';
import ExpenseTracker from '@/features/dashboard/components/ExpenseTracker';
import CreateExpenseForm from '@/features/expenses/components/CreateExpenseForm';
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
      <CreateCategoryForm />
      <CreateItemForm />
      <CreateCategoryBudgetForm />
      <CreateExpenseForm />
    </Layout>
  );
};

export default Dashboard;
