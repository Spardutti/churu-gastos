import CreditCardPaymentsTable from '@/features/cardPayments/components/CardPaymentsTable/CardPaymentsTable';
import CreateCreditCardPayment from '@/features/cardPayments/components/CreateCardPaymentForm';
import { creditCardAPI } from '@/features/creditCard/api/creditCard';
import CreateCreditCardForm from '@/features/creditCard/components/CreateCreditCardForm';
import Layout from '@/layout/Layout';

const Cards = () => {
  const { data } = creditCardAPI.useGetCreditCards();

  return (
    <Layout>
      <CreateCreditCardForm />
      <CreateCreditCardPayment cards={data?.data} />
      <CreditCardPaymentsTable />
    </Layout>
  );
};

export default Cards;
