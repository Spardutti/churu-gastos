import Card from '@/components/card';
import Form from '@/components/form';
import type { FormInputs } from '@/components/form/types';
import * as yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import type { IExpense } from '@/features/expenses/types/IExpense';
import { itemAPI } from '@/features/items/api/items';
import { categoriesAPI } from '@/features/category/api/categories';
import Spinner from '@/components/spinner';
import { useMemo } from 'react';
import { expensesAPI } from '@/features/expenses/api/expenses';
import Heading from '@/components/heading';

interface IInput {
  items: {
    label: string;
    value: string;
  }[];
  categories: {
    label: string;
    value: string;
  }[];
}

const inputs = ({ items, categories }: IInput): FormInputs[] => {
  const formInputs: FormInputs[] = [
    {
      name: 'item',
      label: 'item',
      inputType: 'select',
      value: '',
      placeholder: 'Enter name',
      options: items,
    },

    {
      name: 'amount',
      label: 'Amount',
      inputType: 'number',
      value: 0,
      placeholder: 'Enter Amount',
    },

    {
      name: 'category',
      label: 'Category',
      inputType: 'select',
      value: '',
      placeholder: 'Select Category',
      options: categories,
    },
  ];

  return formInputs;
};

const schema = yup.object({
  item: yup.string().required(),
});

interface CreateExpenseFormProps {}

const CreateExpenseForm = () => {
  const { data: categories, isPending: isLoadingCategories } = categoriesAPI.useGetCategories();
  const { data: items, isPending: isLoadingItems } = itemAPI.useGetItems();

  const { mutateAsync: createExpense } = expensesAPI.useCreateExpense();

  const onSubmit = async (data: IExpense) => {
    const r = await createExpense({ ...data, date: new Date() });
  };

  const cats = useMemo(() => categories?.map((c) => ({ label: c.name, value: c.id })), [categories]);
  const formattedItems = useMemo(() => items?.map((c) => ({ label: c.name, value: c.id })), [items]);

  if (isLoadingCategories || isLoadingItems) {
    return <Spinner />;
  }

  return (
    <div className="flex justify-center">
      <Card variant="info">
        <Heading label="Create Expense" variant="h5" />
        <Form<IExpense>
          isSubmitting={false}
          inputs={inputs({ items: formattedItems, categories: cats })}
          schema={schema}
          submitLabel="Create"
          submit={onSubmit}
        />
      </Card>
    </div>
  );
};

export default CreateExpenseForm;

// TODO work with the correct data and stop using the JSON as guide, example category: {id, name}, should only be the categoryID on create and on fetch we serialize the data.
