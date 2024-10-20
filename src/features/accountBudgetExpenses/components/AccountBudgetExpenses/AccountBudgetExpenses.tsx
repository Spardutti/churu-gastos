import Spinner from '@/components/spinner';
import Table from '@/components/table';
import { accountBudgetExpensesAPI } from '@/features/accountBudgetExpenses/api/accountBudgetExpenses';
import type { IAccountBudgetExpense } from '@/features/accountBudgetExpenses/types/IAccountBudgetExpense';
import { formattedDate } from '@/utils/formatDate';
import { createColumnHelper } from '@tanstack/react-table';

interface AccountBudgetExpensesProps {
  accountBudgetId: string;
}

const columnHelper = createColumnHelper<IAccountBudgetExpense>();

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
  columnHelper.accessor('type', {
    header: () => <span>Type</span>,
    cell: (info) => info.getValue(),
  }),
];

const AccountBudgetExpenses = ({ accountBudgetId }: AccountBudgetExpensesProps) => {
  const { data: accountBudgetExpenses, isLoading } = accountBudgetExpensesAPI.useGetAccountBudgetExpenses({
    accountBudgetId,
  });

  if (isLoading) return <Spinner />;

  if (!accountBudgetExpenses) return <div>No data</div>;

  return <Table data={accountBudgetExpenses.data} columns={columns} sortBy="date" />;
};

export default AccountBudgetExpenses;
