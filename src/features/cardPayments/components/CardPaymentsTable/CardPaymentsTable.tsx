import Spinner from '@/components/spinner';
import Table from '@/components/table';
import { cardPaymentAPI } from '@/features/cardPayments/api/cardPayments';
import type { ICardPayment } from '@/features/cardPayments/types/ICardPayment';
import { formatCurrency } from '@/utils/formatCurrency';
import { formattedDate } from '@/utils/formatDate';
import { createColumnHelper } from '@tanstack/react-table';

const columnHelper = createColumnHelper<ICardPayment>();

const columns = [
  columnHelper.accessor('description', {
    header: () => <span>Description</span>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('total_amount', {
    header: () => <span>Total Amount</span>,
    cell: (info) => formatCurrency({ amount: info.getValue() }),
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
];

const CreditCardPaymentsTable = () => {
  const { data: cardPayments, isPending } = cardPaymentAPI.useGetCardPayments();

  if (isPending) {
    return <Spinner />;
  }
  return (
    <div className="flex justify-center">
      <Table data={cardPayments!.data!} columns={columns} sortBy="next_payment_date" />
    </div>
  );
};

export default CreditCardPaymentsTable;
