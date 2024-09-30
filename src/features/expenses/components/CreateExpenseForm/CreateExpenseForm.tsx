import Card from '@/components/card';
import Form from '@/components/form';
import type { FormInputs } from '@/components/form/types';
import * as yup from 'yup';
import type { IExpense } from '@/features/expenses/types/IExpense';
import { expensesAPI } from '@/features/expenses/api/expenses';
import Heading from '@/components/heading';
import useGenerateDateFromParams from '@/hooks/useGenerateDateFromParams';

const inputs: FormInputs[] = [
  {
    name: 'description',
    label: 'Description',
    inputType: 'text',
    value: '',
    placeholder: 'Enter Description',
  },
  {
    name: 'amount',
    label: 'Amount',
    inputType: 'number',
    value: 0,
    placeholder: 'Enter Amount',
  },
  {
    name: 'is_recursive',
    label: 'Repeat Each Month',
    inputType: 'checkbox',
    value: false,
  },
];

const schema = yup.object({
  amount: yup
    .number()
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .required('Amount is required'),
});

interface CreateExpenseFormProps {
  categoryID: string;
}

const CreateExpenseForm = ({ categoryID }: CreateExpenseFormProps) => {
  const { mutateAsync: createExpense, isPending } = expensesAPI.useCreateExpense();
  const generateCurrentDateFromParams = useGenerateDateFromParams();

  const onSubmit = async (data: IExpense) => {
    const date = generateCurrentDateFromParams();

    await createExpense({ ...data, date, category_id: categoryID });
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-4 lg:flex-grow-0 flex-grow">
        <Card>
          <Heading label="Create Expense" variant="h5" />
          <Form<IExpense>
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
