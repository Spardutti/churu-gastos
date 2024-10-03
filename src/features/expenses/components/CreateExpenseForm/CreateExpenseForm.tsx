import Form from '@/components/form';
import type { FormInputs } from '@/components/form/types';
import * as yup from 'yup';
import type { IExpense } from '@/features/expenses/types/IExpense';
import { expensesAPI } from '@/features/expenses/api/expenses';
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
    inputType: 'currency',
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
  closeModal?: () => void;
}

const CreateExpenseForm = ({ categoryID, closeModal }: CreateExpenseFormProps) => {
  const { mutateAsync: createExpense, isPending } = expensesAPI.useCreateExpense();
  const generateCurrentDateFromParams = useGenerateDateFromParams();

  const onSubmit = async (data: IExpense) => {
    const date = generateCurrentDateFromParams();

    await createExpense({ ...data, date, category_id: categoryID });
    if (closeModal) {
      closeModal();
    }
  };

  return (
    <div className="flex justify-center">
      <Form<IExpense>
        isSubmitting={isPending}
        inputs={inputs}
        schema={schema}
        submitLabel="Create"
        submit={onSubmit}
        className="flex-col"
      />
    </div>
  );
};

export default CreateExpenseForm;
