import Heading from '@/components/heading';
import { budgetAPI } from '@/features/budget/api/budget';
import Categories from '@/features/category/components/Categories';
import CreateCategoryForm from '@/features/category/components/CreateCategoryForm/CreateCategoryForm';
import ExpenseTracker from '@/features/dashboard/components/ExpenseTracker';
import { expensesAPI } from '@/features/expenses/api/expenses';
import { lazy } from 'react';
// import { useMediaQuery } from 'react-responsive';
const Layout = lazy(() => import('@/layout/Layout'));

const Dashboard = () => {
  // const isDesktop = useMediaQuery({
  //   query: '(min-width: 875px)',
  // });

  const { data: expenses } = expensesAPI.useGetExpenses({ year: '2024', month: '9' });

  const { data: budget } = budgetAPI.useGetBudget({ year: '2024', month: '9' });

  return (
    <Layout>
      <ExpenseTracker
        expenses={expenses?.data}
        expensesLabel="Monthly Expenses"
        budgetLabel="Monthly Budget"
        budget={budget?.data?.budget || 0}
      />
      <CreateCategoryForm />
      <Heading variant="h4" label="Choose a category to see the details" />
      <Categories />
    </Layout>
  );
};

export default Dashboard;
