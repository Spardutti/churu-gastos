import Spinner from '@/components/spinner';
import Table from '@/components/table';
import { Product } from '@/features/product/types/types';
import { useGetProductsQuery } from '@/store/api';
import { RootState } from '@/store/store';
import { createColumnHelper } from '@tanstack/react-table';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

const ProductsTable = () => {
  const date = useSelector((state: RootState) => state.date);
  const { data, isLoading, error } = useGetProductsQuery({ date: date.date! }, { skip: !date.date });
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
    return (
      <div className="flex flex-1 bg-main-primary">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <p>Error</p>;
  }

  return <Table columns={columns} data={data!.data!} />;
};

export default ProductsTable;
