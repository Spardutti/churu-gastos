import Table from '@/components/table';
import { Product } from '@/features/product/types/types';
import { useGetProductsQuery } from '@/store/api';
import { createColumnHelper } from '@tanstack/react-table';
import { useMemo } from 'react';

interface ProductsTableProps {}

const ProductsTable = () => {
  const { data, isLoading, error } = useGetProductsQuery();
  const columnHelper = createColumnHelper<Product>();

  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        header: 'Name',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('amount', {
        header: 'Amount',
        cell: (info) => info.getValue(),
        size: 100,
      }),
      columnHelper.accessor('category', {
        header: 'Category',
        cell: (info) => info.getValue()?.name,
        size: 100,
      }),
      columnHelper.accessor('date', {
        header: 'Date',
        cell: (info) => info.getValue(),
        size: 100,
      }),
    ],
    [],
  );

  if (isLoading) {
    return <p>Loading</p>;
  }

  if (error) {
    return <p>Error</p>;
  }

  return (
    <div>
      <Table columns={columns} data={data!.data} />
    </div>
  );
};

export default ProductsTable;
