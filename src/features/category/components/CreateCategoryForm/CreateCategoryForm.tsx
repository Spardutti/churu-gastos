import Card from '@/components/card';
import Form from '@/components/form';
import type { FormInputs } from '@/components/form/types';
import Heading from '@/components/heading';
import { categoriesAPI } from '@/features/category/api/categories';
import type { ICategory } from '@/features/category/types/category';
import { v4 } from 'uuid';
import * as yup from 'yup';

const inputs: FormInputs[] = [
  {
    value: '',
    label: 'Category Name',
    name: 'name',
    placeholder: 'Category name',
    inputType: 'text',
  },
];

const schema = yup.object({
  name: yup.string().required('Category name is required'),
});

const CreateCategoryForm = () => {
  const { mutateAsync: createCategory, isPending } = categoriesAPI.useCreateCategory();

  const handleSubmit = async (data: ICategory) => {
    createCategory({ ...data, id: v4() });
  };
  return (
    <div className="flex justify-center">
      <Card variant="info">
        <Heading label="Create Category" variant="h5" />
        <Form inputs={inputs} submitLabel="Create" isSubmitting={isPending} submit={handleSubmit} schema={schema} />
      </Card>
    </div>
  );
};

export default CreateCategoryForm;
