import Card from '@/components/card';
import Form from '@/components/form';
import type { FormInputs } from '@/components/form/types';
import { itemAPI } from '@/features/items/api/items';
import type { IItem } from '@/features/items/types/types';
import * as yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { categoriesAPI } from '@/features/category/api/categories';
import { useMemo } from 'react';

const inputs = (categories: { label: string; value: string }[]): FormInputs[] => [
  {
    name: 'name',
    label: 'Name',
    inputType: 'text',
    value: '',
    placeholder: 'Enter name',
  },

  {
    name: 'categoryID',
    label: 'Category',
    inputType: 'select',
    value: '',
    placeholder: 'Select Category',
    options: categories,
  },

  {
    name: 'budget',
    label: 'Monthly Budget',
    inputType: 'number',
    value: 0,
    placeholder: 'Enter Budget',
  },
];

const schema = yup.object({
  name: yup.string().required(),
});

const CreateItemForm = () => {
  const { mutateAsync: createItem } = itemAPI.useCreateItem();
  const { data: categories } = categoriesAPI.useGetCategories();

  const onSubmit = async (data: IItem) => {
    await createItem({ ...data, id: uuidv4(), date: new Date() });
  };

  const formatCategories = useMemo(() => {
    return categories?.map((category) => ({ label: category.name, value: category.id }));
  }, [categories]);

  if (!formatCategories) {
    return <p>No</p>;
  }
  return (
    <div className="flex justify-center">
      <Card variant="info">
        <p>Create Item</p>
        <Form<IItem>
          isSubmitting={false}
          inputs={inputs(formatCategories)}
          schema={schema}
          submitLabel="Create"
          submit={onSubmit}
        />
      </Card>
    </div>
  );
};

export default CreateItemForm;
