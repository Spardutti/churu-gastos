import Heading from '@/components/heading';
import { categoriesAPI } from '@/features/category/api/categories';
import Categories from '@/features/category/components/Categories';
import CreateCategoryForm from '@/features/category/components/CreateCategoryForm/CreateCategoryForm';
import ExpenseTracker from '@/features/dashboard/components/ExpenseTracker';
import { expensesAPI } from '@/features/expenses/api/expenses';
import { lazy, useMemo } from 'react';
import { useMediaQuery } from 'react-responsive';
const Layout = lazy(() => import('@/layout/Layout'));

const Dashboard = () => {
  const isDesktop = useMediaQuery({
    query: '(min-width: 875px)',
  });

  const { data: expenses } = expensesAPI.useGetExpenses();

  const { data: categories } = categoriesAPI.useGetCategories();

  const budget = useMemo(() => categories?.reduce((acc, category) => acc + category.budget, 0), []);

  return (
    <Layout>
      <ExpenseTracker
        expenses={expenses!}
        expensesLabel="Monthly Expenses"
        budgetLabel="Monthly Budget"
        budget={budget!}
      />
      <CreateCategoryForm />
      <Heading variant="h4" label="Choose a category to see the details" />
      <Categories />
    </Layout>
  );
};

export default Dashboard;
