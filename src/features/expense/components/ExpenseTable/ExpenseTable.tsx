import Spinner from '@/components/spinner';
import Table from '@/components/table';
import { expenseAPI } from '@/features/expense/api/expense';
import type { IExpense } from '@/features/expense/types/types';
import { formattedDate } from '@/utils/formatDate';
import { createColumnHelper } from '@tanstack/react-table';
import { useMemo } from 'react';

const ExpenseTable = () => {
  const columnHelper = createColumnHelper<IExpense>();

  const { data, isLoading, error } = expenseAPI.useGetExpenses();

  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        id: 'name',
        header: 'Name',
        cell: (info) => info.getValue(),
        size: 200,
      }),
      columnHelper.accessor('amount', {
        header: 'Amount',
        cell: (info) => info.getValue(),
        size: 200,
        id: 'amount',
      }),
      columnHelper.accessor('category', {
        header: 'Category',
        cell: (info) => info.getValue(),
        size: 200,
        id: 'category',
      }),
      columnHelper.accessor('date', {
        header: 'Date',
        cell: (info) => formattedDate(info.getValue()),
        size: 200,
        id: 'date',
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

  return (
    <div className="flex justify-center">
      <Table columns={columns} data={data!} sortBy="date" />
    </div>
  );
};

export default ExpenseTable;
