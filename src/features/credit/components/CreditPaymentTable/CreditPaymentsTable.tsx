import Spinner from '@/components/spinner';
import Table from '@/components/table';
import type { ICreditPayment } from '@/features/credit/types/ICreditPayment';

import { formatCurrency } from '@/utils/formatCurrency';
import { formattedDate } from '@/utils/formatDate';
import { createColumnHelper } from '@tanstack/react-table';

const columnHelper = createColumnHelper<ICreditPayment>();

const columns = [
  columnHelper.accessor('description', {
    header: () => <span>Description</span>,
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor('nextPaymentDate', {
    header: () => <span>Next Payment</span>,
    cell: (info) => formattedDate(info.getValue()),
  }),
  columnHelper.accessor('numberOfPayments', {
    header: () => <span>Total Payments</span>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('paymentsMade', {
    header: () => <span>Payments Done</span>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('monthlyPaymentAmount', {
    header: () => <span>Per Month</span>,
    cell: (info) => formatCurrency({ amount: info.getValue() }),
  }),
  columnHelper.accessor('isPaymentComplete', {
    header: () => <span>Status</span>,
    cell: (info) => {
      const status = info.getValue();
      if (status) {
        return <span className="text-green-500">Completed</span>;
      } else {
        return <span className="text-red-500">Pending</span>;
      }
    },
  }),
];

interface CreditPaymentsTableProps {
  creditPayments: ICreditPayment[];
  isPending: boolean;
}

const CreditPaymentsTable = ({ creditPayments, isPending }: CreditPaymentsTableProps) => {
  if (isPending) {
    return <Spinner />;
  }
  return (
    <div className="flex md:justify-center">
      <Table data={creditPayments} columns={columns} sortBy="nextPaymentDate" />
    </div>
  );
};

export default CreditPaymentsTable;
