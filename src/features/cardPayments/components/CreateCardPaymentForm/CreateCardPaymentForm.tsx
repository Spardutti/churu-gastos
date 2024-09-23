import Card from '@/components/card';
import Form from '@/components/form';
import type { FormInputs } from '@/components/form/types';
import * as yup from 'yup';
import Heading from '@/components/heading';
import type { ICardPayment } from '@/features/cardPayments/types/ICardPayment';
import { cardPaymentAPI } from '@/features/cardPayments/api/cardPayments';
import type { ICreditCard } from '@/features/creditCard/types/ICreditCard';
import Spinner from '@/components/spinner';
import { useMemo } from 'react';

const inputs = (options: { label: string; value: string }[]): FormInputs[] => [
  {
    name: 'card_id',
    label: 'Card',
    inputType: 'select',
    value: '',
    placeholder: 'Select Card',
    options: options,
  },
  {
    name: 'description',
    label: 'Description',
    inputType: 'text',
    value: '',
    placeholder: 'Enter Description',
  },
  {
    name: 'total_amount',
    label: 'Total Amount ',
    inputType: 'number',
    value: 0,
    placeholder: 'Amount',
  },

  {
    name: 'initial_payment_date',
    label: 'Initial payment date',
    inputType: 'date',
    value: '',
    placeholder: 'Date of acquisition',
  },
  {
    name: 'number_of_payments',
    label: 'Total Payments Count',
    inputType: 'number',
    value: 0,
    placeholder: 'Total payments to be done',
  },
];

const schema = yup.object({
  description: yup.string().required('Name is required'),
  total_amount: yup
    .number()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .required('Card Type is required'),
  initial_payment_date: yup
    .date()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .required('Card Type is required'),
  number_of_payments: yup
    .number()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .required('Card Type is required'),
});

interface CreateCreditCardPaymentProps {
  cards: ICreditCard[] | undefined;
}

const CreateCreditCardPayment = ({ cards }: CreateCreditCardPaymentProps) => {
  const { mutateAsync: createPayment, isPending } = cardPaymentAPI.useCreateCardPayment();

  const onSubmit = async (data: ICardPayment) => {
    await createPayment(data);
  };

  const formattedCardInfo = useMemo(() => {
    if (!cards) return [];

    return cards.map((card) => ({
      label: card.name,
      value: card!.id!,
    }));
  }, [cards]);

  if (!cards) {
    return <Spinner />;
  }

  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-4 lg:flex-grow-0 flex-grow">
        <Card>
          <Heading label="Card Expense" variant="h5" />
          <Form<ICardPayment>
            isSubmitting={isPending}
            inputs={inputs(formattedCardInfo!)}
            schema={schema}
            submitLabel="Create"
            submit={onSubmit}
            className="lg:flex-row flex-col"
          />
        </Card>
      </div>
    </div>
  );
};

export default CreateCreditCardPayment;
