import Form from '@/components/form';
import type { FormInputs } from '@/components/form/types';
import * as yup from 'yup';
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
    inputType: 'currency',
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

interface FormProps {
  closeModal: () => void;
}

const CreateExpenseForm = ({ closeModal }: FormProps) => {
  const { mutateAsync: createUniqueExpense, isPending } = uniqueExpenseAPI.useCreateUniqueExpense();

  const onSubmit = async (data: IUniqueExpense) => {
    await createUniqueExpense(data);
    closeModal();
  };

  return (
    <div className="flex justify-center self-stretch">
      <Form<IUniqueExpense>
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
