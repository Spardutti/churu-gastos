import Card from '@/components/card';
import Form from '@/components/form';
import * as yup from 'yup';
import Heading from '@/components/heading';
import type { ICreditPayment } from '@/features/credit/types/ICreditPayment';
import { creditPaymentAPI } from '@/features/credit/api/creditPayment';
import type { FormInputs } from '@/components/form/types';

const inputs: FormInputs[] = [
  {
    name: 'description',
    label: 'Description',
    inputType: 'text',
    value: '',
    placeholder: 'description',
  },
  {
    name: 'monthly_payment_amount',
    label: 'Monthly Amount ',
    inputType: 'number',
    value: 0,
    placeholder: 'amount',
  },

  {
    name: 'next_payment_date',
    label: 'Next payment',
    inputType: 'date',
    value: '',
    placeholder: 'next payment',
  },
  {
    name: 'number_of_payments',
    label: 'Total Payments',
    inputType: 'number',
    value: 0,
    placeholder: 'payments to be done',
  },
];

const schema = yup.object({
  description: yup.string().required('description is required'),
  monthly_payment_amount: yup
    .number()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .required('amount is required'),
  next_payment_date: yup
    .date()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .required('date is required'),
  number_of_payments: yup
    .number()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .required('payments are required'),
});

const CreateCreditPaymentForm = () => {
  const { mutateAsync: createPayment, isPending } = creditPaymentAPI.useCreateCreditPayment();

  const onSubmit = async (data: ICreditPayment) => {
    await createPayment(data);
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-4 lg:flex-grow-0 flex-grow">
        <Card>
          <Heading label="Card Expense" variant="h5" />
          <Form<ICreditPayment>
            isSubmitting={isPending}
            inputs={inputs}
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

export default CreateCreditPaymentForm;
