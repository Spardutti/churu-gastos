import Spinner from '@/components/spinner';
import Table from '@/components/table';
import { expensesAPI } from '@/features/expenses/api/expenses';
import type { IExpense } from '@/features/expenses/types/IExpense';
import useDateSelector from '@/features/month/hooks/useDateSelector';
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
  const { activeDate } = useDateSelector();
  const { data: expenses, isPending } = expensesAPI.useGetExpenses({
    categoryID,
    year: activeDate.year,
    month: activeDate.month,
  });

  if (isPending) {
    return <Spinner />;
  }
  return (
    <div className="flex justify-center">
      <Table data={expenses!.data!} columns={columns} sortBy="date" />
    </div>
  );
};

export default ExpenseTable;
