import Card from '@/components/card';
import Form from '@/components/form';
import type { FormInputs } from '@/components/form/types';
import Heading from '@/components/heading';
import Spinner from '@/components/spinner';
import { categoriesAPI } from '@/features/category/api/categories';
import { categoryBudgetAPI } from '@/features/categoryBudget/api/categoryBudget';
import type { ICategoryBudget } from '@/features/categoryBudget/types/ICategoryBudget';
import { useMemo } from 'react';
import { v4 } from 'uuid';
import * as yup from 'yup';

const inputs = (categories: { label: string; value: string }[]): FormInputs[] => [
  {
    value: 0,
    label: 'Budget',
    name: 'budget',
    placeholder: 'Category Monthly budget',
    inputType: 'number',
  },
  {
    value: '',
    label: 'Category',
    name: 'categoryID',
    placeholder: 'Category',
    inputType: 'select',
    options: categories,
  },
];

const schema = yup.object({
  budget: yup.string().required('Budget is required'),
});

const CreateCategoryBudgetForm = () => {
  const { mutateAsync: createCategoryBudget, isPending } = categoryBudgetAPI.useCreateCategoryBudget();
  const { data: categories, isPending: isLoadingCategories } = categoriesAPI.useGetCategories();

  const handleSubmit = async (data: ICategoryBudget) => {
    createCategoryBudget({ ...data, id: v4(), date: new Date() });
  };

  const formattedInputs = useMemo(() => {
    return categories?.map((cat) => ({ label: cat.name, value: cat.id }));
  }, [categories]);

  if (isLoadingCategories) {
    return <Spinner />;
  }

  return (
    <div className="flex justify-center">
      <Card variant="info">
        <Heading label="Create Category Budget" variant="h5" />
        <Form
          inputs={inputs(formattedInputs)}
          submitLabel="Create"
          isSubmitting={isPending}
          submit={handleSubmit}
          schema={schema}
        />
      </Card>
    </div>
  );
};

export default CreateCategoryBudgetForm;
