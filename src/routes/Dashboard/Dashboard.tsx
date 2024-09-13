import Accordion from '@/components/accordion';
import Button from '@/components/button';
import LazyComponent from '@/components/lazyComponent';
import ExpenseTable from '@/features/expense/components/ExpenseTable';
import Month from '@/features/month/components/Month';

import { lazy } from 'react';
import { useMediaQuery } from 'react-responsive';
const Layout = lazy(() => import('@/layout/Layout'));
const ProductsTable = lazy(() => import('@/features/expense/components/ExpenseTable'));
const CreateProductForm = lazy(() => import('@/features/expense/components/CreateExpenseForm'));
const CreateCategoryForm = lazy(() => import('@/features/category/components/CreateCategoryForm/CreateCategoryForm'));

const items = [
  {
    trigger: <Button type="button" text="Add Expense" variant="primary" />,
    value: '01',
    content: <CreateProductForm />,
  },
  {
    trigger: <Button variant="primary" text="Create Category" isLoading={false} type="button" />,
    value: '003',
    content: <CreateCategoryForm />,
  },
  {
    trigger: <Button type="button" text="Show Expenses" variant="primary" />,
    value: '02',
    content: <ProductsTable />,
  },
];

const Dashboard = () => {
  const isDesktop = useMediaQuery({
    query: '(min-width: 875px)',
  });

  return (
    <LazyComponent>
      <Layout>
        <ExpenseTable />
      </Layout>
    </LazyComponent>
  );
};

export default Dashboard;
