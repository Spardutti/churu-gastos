import Card from '@/components/card';
import Form from '@/components/form';
import type { FormInputs } from '@/components/form/types';
import Heading from '@/components/heading';
import { categoriesAPI } from '@/features/category/api/categories';
import * as yup from 'yup';

const inputs: FormInputs[] = [
  {
    value: '',
    label: 'Category Name',
    name: 'name',
    placeholder: 'Category name',
    inputType: 'text',
  },
  {
    value: 0,
    label: 'Category Budget',
    name: 'amount',
    placeholder: 'Category Budget',
    inputType: 'number',
  },
];

const schema = yup.object({
  name: yup.string().required('Category name is required'),
  amount: yup.number().required('Category budget is required'),
});

const CreateCategoryForm = () => {
  const { mutateAsync: createCategory, isPending } = categoriesAPI.useCreateCategory();

  const handleSubmit = async (data: { name: string; amount: number }) => {
    createCategory(data);
  };
  return (
    <div className="flex justify-center">
      <Card variant="info">
        <Heading label="Create Category" variant="h5" />
        <Form
          direction="row"
          inputs={inputs}
          submitLabel="Create"
          isSubmitting={isPending}
          submit={handleSubmit}
          schema={schema}
        />
      </Card>
    </div>
  );
};

export default CreateCategoryForm;
