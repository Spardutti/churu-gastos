import Heading from '@/components/heading';
import { budgetAPI } from '@/features/budget/api/budget';
import Categories from '@/features/category/components/Categories';
import CreateCategoryForm from '@/features/category/components/CreateCategoryForm/CreateCategoryForm';
import ExpenseTracker from '@/features/dashboard/components/ExpenseTracker';
import { expensesAPI } from '@/features/expenses/api/expenses';
import { lazy } from 'react';
// import { useMediaQuery } from 'react-responsive';
const Layout = lazy(() => import('@/layout/Layout'));

const date = new Date();
const year = String(date.getFullYear());
const month = String(date.getMonth() + 1);

const Dashboard = () => {
  // const isDesktop = useMediaQuery({
  //   query: '(min-width: 875px)',
  // });

  const { data: expenses } = expensesAPI.useGetExpenses({ year, month });

  const { data: budget } = budgetAPI.useGetBudget({ year, month });

  return (
    <Layout>
      <ExpenseTracker
        expenses={expenses?.data}
        expensesLabel="Monthly Expenses"
        budgetLabel="Monthly Budget"
        budget={budget?.data?.monthly_budget || 0}
      />
      <CreateCategoryForm />
      <Heading variant="h4" label="Choose a category to see the details" />
      <Categories />
    </Layout>
  );
};

export default Dashboard;
