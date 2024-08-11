import Button from '@/components/button';
import LazyComponent from '@/components/lazyComponent';
import { lazy, useState } from 'react';
const ProductsTable = lazy(() => import('@/features/home/components/ProductsTable'));
const CreateCategoryForm = lazy(() => import('@/features/category/components/CreateCategoryForm/CreateCategoryForm'));

const ProductsMobileView = () => {
  const [showTable, setShowTable] = useState(false);
  const [categoryForm, setCategoryForm] = useState(false);

  return (
    <div>
      <div className="flex justify-between self-stretch">
        <Button
          text={showTable ? 'Hide Table' : 'Show Table'}
          isLoading={false}
          onClick={() => setShowTable(!showTable)}
          type="button"
        />
        <Button
          text={categoryForm ? 'Hide' : 'Create Category'}
          isLoading={false}
          onClick={() => setCategoryForm(!categoryForm)}
          type="button"
        />
      </div>

      {categoryForm && (
        <div className="mt-4">
          <LazyComponent>
            <CreateCategoryForm />
          </LazyComponent>
        </div>
      )}

      {showTable && (
        <div className="mt-4">
          <LazyComponent>
            <ProductsTable />
          </LazyComponent>
        </div>
      )}
    </div>
  );
};

export default ProductsMobileView;
