import Card from '@/components/card';
import Form from '@/components/form';
import type { FormInputs } from '@/components/form/types';
import * as yup from 'yup';
import Heading from '@/components/heading';
import type { IUniqueExpense } from '@/features/uniqueExpenses/types/IUniqueExpense';
import { uniqueExpenseAPI } from '@/features/uniqueExpenses/api/uniqueExpenses';

const inputs: FormInputs[] = [
  {
    name: 'name',
    label: 'Name',
    inputType: 'text',
    value: '',
    placeholder: 'Enter Name',
  },
  {
    name: 'amount',
    label: 'Amount',
    inputType: 'number',
    value: 0,
    placeholder: 'Enter Amount',
  },
];

const schema = yup.object({
  amount: yup
    .number()
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .required('Amount is required')
    .test('is-positive', 'Amount must be positive', (value) => value > 0),
  name: yup.string().required('Name is required'),
});

const CreateExpenseForm = () => {
  const { mutateAsync: createUniqueExpense, isPending } = uniqueExpenseAPI.useCreateUniqueExpense();

  const onSubmit = async (data: IUniqueExpense) => {
    await createUniqueExpense(data);
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-4 lg:flex-grow-0 flex-grow">
        <Card>
          <Heading label="Create Unique Expense" variant="h5" />
          <Form<IUniqueExpense>
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

export default CreateExpenseForm;
