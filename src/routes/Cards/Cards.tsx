import Card from '@/components/card';
import Spinner from '@/components/spinner';
import { creditPaymentAPI } from '@/features/credit/api/creditPayment';
import CreateCreditPaymentForm from '@/features/credit/components/CreateCreditPaymentForm';
import CreditPaymentTable from '@/features/credit/components/CreditPaymentTable';
import Layout from '@/layout/Layout';
import { formatCurrency } from '@/utils/formatCurrency';

const Cards = () => {
  const { data: creditPayments, isPending } = creditPaymentAPI.useGetCreditPayments();

  if (isPending) {
    return <Spinner />;
  }

  return (
    <Layout>
      <div className="flex flex-col items-center gap-10">
        <div className="lg:w-44 flex justify-center">
          <Card>
            <div className="flex flex-col gap-2 items-center min-w-44">
              <p>Month Total</p>
              <p className="text-white font-bold">{formatCurrency({ amount: creditPayments?.month_total || 0 })}</p>
            </div>
          </Card>
        </div>
        <CreateCreditPaymentForm />
        <div className="overflow-auto w-full">
          <CreditPaymentTable creditPayments={creditPayments!.data} isPending={isPending} />
        </div>
      </div>
    </Layout>
  );
};

export default Cards;
