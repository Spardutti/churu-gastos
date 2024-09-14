import Accordion from '@/components/accordion';
import Button from '@/components/button';
import Form from '@/components/form';
import LazyComponent from '@/components/lazyComponent';
import ExpenseTracker from '@/features/dashboard/components/ExpenseTracker';
import ExpenseTable from '@/features/expense/components/ExpenseTable';
import Month from '@/features/month/components/Month';

import { lazy } from 'react';
import { useMediaQuery } from 'react-responsive';
const Layout = lazy(() => import('@/layout/Layout'));
const ProductsTable = lazy(() => import('@/features/expense/components/ExpenseTable'));
const CreateProductForm = lazy(() => import('@/features/expense/components/CreateExpenseForm'));
const CreateCategoryForm = lazy(() => import('@/features/category/components/CreateCategoryForm/CreateCategoryForm'));

const Dashboard = () => {
  const isDesktop = useMediaQuery({
    query: '(min-width: 875px)',
  });

  return (
    <Layout>
      <ExpenseTracker />
      {/* <Form /> */}
    </Layout>
  );
};

export default Dashboard;
