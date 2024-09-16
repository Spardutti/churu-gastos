import Card from '@/components/card';
import Form from '@/components/form';
import type { FormInputs } from '@/components/form/types';
import * as yup from 'yup';
import { v4 } from 'uuid';
import type { IExpense } from '@/features/expenses/types/IExpense';
import { expensesAPI } from '@/features/expenses/api/expenses';
import Heading from '@/components/heading';

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
];

const schema = yup.object({
  amount: yup.number().required(),
});

interface CreateExpenseFormProps {
  categoryID: string;
}

const CreateExpenseForm = ({ categoryID }: CreateExpenseFormProps) => {
  const { mutateAsync: createExpense } = expensesAPI.useCreateExpense();

  const onSubmit = async (data: IExpense) => {
    await createExpense({ ...data, date: new Date(), id: v4(), categoryID });
  };

  return (
    <div className="flex justify-center">
      <Card variant="info">
        <Heading label="Create Expense" variant="h5" />
        <Form<IExpense>
          direction="row"
          isSubmitting={false}
          inputs={inputs}
          schema={schema}
          submitLabel="Create"
          submit={onSubmit}
        />
      </Card>
    </div>
  );
};

export default CreateExpenseForm;
