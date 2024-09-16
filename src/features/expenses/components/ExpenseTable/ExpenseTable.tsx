import Spinner from '@/components/spinner';
import Table from '@/components/table';
import { expensesAPI } from '@/features/expenses/api/expenses';
import type { IExpense } from '@/features/expenses/types/IExpense';
import { formattedDate } from '@/utils/formatDate';
import { createColumnHelper } from '@tanstack/react-table';

interface ExpenseTableProps {
  categoryID: string;
}

const columnHelper = createColumnHelper<IExpense>();

const columns = [
  columnHelper.accessor('description', {
    header: () => <span>Description</span>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('amount', {
    header: () => <span>Amount</span>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('date', {
    header: () => <span>Date</span>,
    cell: (info) => formattedDate(info.getValue()),
  }),
];

const ExpenseTable = ({ categoryID }: ExpenseTableProps) => {
  const { data: expenses, isPending } = expensesAPI.useGetExpenses({ query: `categoryID=${categoryID}` });

  if (isPending) {
    return <Spinner />;
  }
  return (
    <div className="flex justify-center">
      <Table data={expenses!} columns={columns} sortBy="description" />
    </div>
  );
};

export default ExpenseTable;
