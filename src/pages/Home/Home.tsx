import CategoryForm from '@/features/category/components/CategoryForm/CategoryForm';
import CreateProductForm from '@/features/home/components/CreateProductForm';
import ProductsTable from '@/features/home/components/ProductsTable';
import Layout from '@/layout';

const Home = () => {
  return (
    <Layout>
      <div className="flex justify-center gap-10 flex-col items-center">
        <div className="shadow-lg p-4 rounded-lg min-w-[400px] bg-main-primary">
          <CreateProductForm />
        </div>
        <div className="shadow-lg p-4 rounded-lg min-w-[400px] bg-main-primary">
          <CategoryForm />
        </div>
        <ProductsTable />
      </div>
    </Layout>
  );
};

export default Home;
