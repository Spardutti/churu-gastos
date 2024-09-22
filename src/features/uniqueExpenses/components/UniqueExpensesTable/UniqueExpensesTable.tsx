import Spinner from '@/components/spinner';
import Table from '@/components/table';
import { uniqueExpenseAPI } from '@/features/uniqueExpenses/api/uniqueExpenses';
import type { IUniqueExpense } from '@/features/uniqueExpenses/types/IUniqueExpense';
import { formatCurrency } from '@/utils/formatCurrency';
import { formattedDate } from '@/utils/formatDate';
import { yearAndMonth } from '@/utils/yearAndMonth';
import { createColumnHelper } from '@tanstack/react-table';

const columnHelper = createColumnHelper<IUniqueExpense>();

const columns = [
  columnHelper.accessor('name', {
    header: () => <span>Name</span>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('amount', {
    header: () => <span>Amount</span>,
    cell: (info) => formatCurrency({ amount: info.getValue() }),
  }),
  columnHelper.accessor('date', {
    header: () => <span>Date</span>,
    cell: (info) => formattedDate(info.getValue()),
  }),
];

const { year, month } = yearAndMonth();

const UniqueExpenseTable = () => {
  const { data: expenses, isPending } = uniqueExpenseAPI.useGetUniqueExpenses({
    year,
    month,
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

export default UniqueExpenseTable;
