import Accordion from '@/components/accordion';
import Button from '@/components/button';
import LazyComponent from '@/components/lazyComponent';
import Month from '@/features/month/components/Month';
import { lazy } from 'react';
import { useMediaQuery } from 'react-responsive';
const Layout = lazy(() => import('@/layout/Layout'));
const ProductsTable = lazy(() => import('@/features/home/components/ProductsTable'));
const CreateProductForm = lazy(() => import('@/features/home/components/CreateProductForm'));
const CreateCategoryForm = lazy(() => import('@/features/category/components/CreateCategoryForm/CreateCategoryForm'));

const items = [
  {
    trigger: <Button type="button" text="Add Expense" variant="primary" />,
    value: '01',
    content: <CreateProductForm />,
  },
  {
    trigger: <Button variant="primary" text={'Create Category'} isLoading={false} type="button" />,
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
        {isDesktop && (
          <div className="flex justify-center gap-10 flex-col items-center">
            <div className="shadow-lg p-4 rounded-lg min-w-[400px] bg-main-primary">
              <CreateProductForm />
            </div>
            <div className="shadow-lg p-4 rounded-lg min-w-[400px] bg-main-primary">
              <CreateCategoryForm />
            </div>
            <ProductsTable />
          </div>
        )}

        {!isDesktop && (
          <div className="p-4 flex self-stretch flex-col gap-4 ">
            <Month />
            <Accordion items={items} />
            {/* <CreateProductForm /> */}
          </div>
        )}
      </Layout>
    </LazyComponent>
  );
};

export default Dashboard;
