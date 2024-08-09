import { Product } from '@/features/product/types';
import { useGetProductsQuery } from '@/store/api';

interface ProductsProps {}

const Products = () => {
  const { data, isLoading } = useGetProductsQuery();
  return (
    <div className="flex">
      {data?.data?.map((product: Product) => (
        <div key={product.id}>
          <p>{product.name}</p>
          <p>{product.amount}</p>
          <p>{product.category.name}</p>
          <p>{product.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Products;
