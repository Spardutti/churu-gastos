import Card from '@/components/card';
import Spinner from '@/components/spinner';
import { categoriesAPI } from '@/features/category/api/categories';
import type { ICategory } from '@/features/category/types/ICategory';
import useDateSelector from '@/features/month/hooks/useDateSelector';
import routes from '@/routes/routes';
import { useNavigate } from 'react-router-dom';

const Categories = () => {
  const navigate = useNavigate();

  const { activeDate } = useDateSelector();

  const { data: categories, isPending } = categoriesAPI.useGetCategories({
    year: activeDate.year,
    month: activeDate.month,
  });

  const onCategoryClick = (ID: string) => {
    navigate(routes.CATEGORY({ categoryID: ID }));
  };

  if (isPending) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {categories?.data?.length === 0 && <p className="text-center">No categories found</p>}
      {categories?.data?.map((category: ICategory, index) => (
        <div key={category.name + index} className="min-w-44 flex-shrink-0">
          <Card onClick={() => onCategoryClick(category.id!)}>
            <div className="flex flex-col items-center">
              <p>{category.name}</p>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default Categories;
