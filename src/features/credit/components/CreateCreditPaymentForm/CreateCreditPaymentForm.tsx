import Card from '@/components/card';
import Form from '@/components/form';
import * as yup from 'yup';
import Heading from '@/components/heading';
import type { ICreditPayment } from '@/features/credit/types/ICreditPayment';
import { creditPaymentAPI } from '@/features/credit/api/creditPayment';
import type { FormInputs } from '@/components/form/types';
import dayjs from 'dayjs';

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
    min: 0,
  },

  {
    name: 'next_payment_date',
    label: 'Next payment',
    inputType: 'select',
    value: '',
    placeholder: 'next payment',
    options: [
      { value: 0, label: 'January' },
      { value: 1, label: 'February' },
      { value: 2, label: 'March' },
      { value: 3, label: 'April' },
      { value: 4, label: 'May' },
      { value: 5, label: 'June' },
      { value: 6, label: 'July' },
      { value: 7, label: 'August' },
      { value: 8, label: 'September' },
      { value: 9, label: 'October' },
      { value: 10, label: 'November' },
      { value: 11, label: 'December' },
    ],
  },
  {
    name: 'number_of_payments',
    label: 'Total Payments',
    inputType: 'number',
    value: 0,
    placeholder: 'payments to be done',
    min: 0,
  },
];

const schema = yup.object({
  description: yup.string().required('description is required'),
  monthly_payment_amount: yup
    .number()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .required('amount is required'),
  next_payment_date: yup.string().required('date is required'),
  number_of_payments: yup
    .number()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .required('payments are required'),
});

const CreateCreditPaymentForm = () => {
  const { mutateAsync: createPayment, isPending } = creditPaymentAPI.useCreateCreditPayment();

  const onSubmit = async (data: ICreditPayment) => {
    const currentYear = dayjs().year();

    const month = Number(data.next_payment_date) + 1;

    const date = new Date(`${currentYear}-${month}-01`);

    await createPayment({ ...data, next_payment_date: date });
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
