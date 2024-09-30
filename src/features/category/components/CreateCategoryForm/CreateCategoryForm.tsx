import Card from '@/components/card';
import Form from '@/components/form';
import type { FormInputs } from '@/components/form/types';
import Heading from '@/components/heading';
import { categoriesAPI } from '@/features/category/api/categories';
import useGenerateDateFromParams from '@/hooks/useGenerateDateFromParams';
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
    name: 'budget',
    placeholder: 'Category Budget',
    inputType: 'number',
  },
];

const schema = yup.object({
  name: yup.string().required('Category name is required'),
  budget: yup
    .number()
    .required('Category budget is required')
    .transform((value, originalValue) => (originalValue === '' ? null : value)),
});

const CreateCategoryForm = () => {
  const { mutateAsync: createCategory, isPending } = categoriesAPI.useCreateCategory();
  const generateCurrentDateFromParams = useGenerateDateFromParams();

  const handleSubmit = async (data: { name: string; budget: number }) => {
    const date = generateCurrentDateFromParams();
    createCategory({ ...data, date });
  };
  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-4 lg:flex-grow-0 flex-grow">
        <Card>
          <Heading label="Create Category" variant="h4" />
          <Form
            className="lg:flex-row flex-col"
            inputs={inputs}
            submitLabel="Create"
            isSubmitting={isPending}
            submit={handleSubmit}
            schema={schema}
          />
        </Card>
      </div>
    </div>
  );
};

export default CreateCategoryForm;
