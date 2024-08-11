import LazyComponent from '@/components/lazyComponent';
import { lazy } from 'react';
import { useMediaQuery } from 'react-responsive';
const MobileLayout = lazy(() => import('@/layout/MobileLayout'));
const DesktopLayout = lazy(() => import('@/layout/DesktopLayout'));
const ProductsTable = lazy(() => import('@/features/home/components/ProductsTable'));
const CreateProductForm = lazy(() => import('@/features/home/components/CreateProductForm'));
const CategoryForm = lazy(() => import('@/features/category/components/CategoryForm/CategoryForm'));

interface DashboardProps {}

const Dashboard = () => {
  const isDesktop = useMediaQuery({
    query: '(min-width: 875px)',
  });

  return isDesktop ? (
    <LazyComponent>
      <DesktopLayout>
        <div className="flex justify-center gap-10 flex-col items-center">
          <div className="shadow-lg p-4 rounded-lg min-w-[400px] bg-main-primary">
            <CreateProductForm />
          </div>
          <div className="shadow-lg p-4 rounded-lg min-w-[400px] bg-main-primary">
            <CategoryForm />
          </div>
          <ProductsTable />
        </div>
      </DesktopLayout>
    </LazyComponent>
  ) : (
    <LazyComponent>
      <MobileLayout>
        <CreateProductForm />
      </MobileLayout>
    </LazyComponent>
  );
};

export default Dashboard;
