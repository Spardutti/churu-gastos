import Card from '@/components/card';
import Form from '@/components/form';
import { FormInputs } from '@/components/form/types';
import { Category } from '@/features/category/types/category';
import { useCreteProductMutation, useGetCategoriesQuery } from '@/store/api';
import { useMemo } from 'react';
import * as yup from 'yup';

type FormData = {
  name: string;
  category: Category;
  amount: number;
};

const schema = yup.object({
  name: yup.string().required('Name is required'),
  category: yup.object().required('Category is required'),
  amount: yup.number().required('Amount is required'),
});

const CreateExpenseForm = () => {
  const { data: categories } = useGetCategoriesQuery();

  const [createProduct, { isLoading }] = useCreteProductMutation();

  const submit = async (data: FormData) => {
    const category = categories!.data!.find((cat) => cat.id == data.category.id);
    await createProduct({ ...data, category_id: category!.id, category_name: category!.name });
  };

  const formInputs = useMemo(() => {
    const baseInputs: FormInputs[] = [
      {
        type: 'text',
        value: '',
        label: 'Expense Name',
        name: 'name',
        placeholder: 'Enter expense name',
        inputType: 'text',
      },
      {
        type: 'number',
        value: '',
        label: 'Expense amount',
        name: 'amount',
        placeholder: 'Enter expense amount',
        inputType: 'text',
      },
      {
        type: 'text',
        value: '',
        label: 'Description',
        name: 'description',
        placeholder: 'Brief description',
        inputType: 'text',
      },
      {
        type: 'date',
        value: '',
        label: 'Date',
        name: 'date',
        placeholder: '',
        inputType: 'date',
      },
    ];

    if (!categories?.data) return baseInputs;

    const inputs: FormInputs[] = [
      ...baseInputs,
      {
        type: 'select',
        value: '',
        label: 'Category',
        name: 'category',
        placeholder: 'Select category',
        inputType: 'select',
        options: categories.data.map((cat) => ({ value: String(cat.id), label: cat.name })),
      },
    ];

    return inputs;
  }, [categories]);

  return (
    <Card>
      <Form submit={submit} inputs={formInputs} submitLabel="Create" schema={schema} isSubmitting={isLoading} />
    </Card>
  );
};

export default CreateExpenseForm;
