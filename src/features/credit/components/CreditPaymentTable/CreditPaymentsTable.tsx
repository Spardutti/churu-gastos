import Spinner from '@/components/spinner';
import Table from '@/components/table';
import { creditPaymentAPI } from '@/features/credit/api/creditPayment';
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

  columnHelper.accessor('next_payment_date', {
    header: () => <span>Next Payment</span>,
    cell: (info) => formattedDate(info.getValue()),
  }),
  columnHelper.accessor('number_of_payments', {
    header: () => <span>Total Payments</span>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('payments_made', {
    header: () => <span>Payments Done</span>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('monthly_payment_amount', {
    header: () => <span>Per Month</span>,
    cell: (info) => formatCurrency({ amount: info.getValue() }),
  }),
  columnHelper.accessor('is_payment_complete', {
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
      <Table data={creditPayments} columns={columns} sortBy="next_payment_date" />
    </div>
  );
};

export default CreditPaymentsTable;
