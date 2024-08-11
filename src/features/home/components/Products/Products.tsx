import { Product } from '@/features/product/types/types';
import { useGetProductsQuery } from '@/store/api';

const Products = () => {
  const { data } = useGetProductsQuery();
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
