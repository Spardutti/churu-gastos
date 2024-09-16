import Button from '@/components/button';
import Spinner from '@/components/spinner';
import { categoriesAPI } from '@/features/category/api/categories';
import routes from '@/routes/routes';
import { useNavigate } from 'react-router-dom';


const Categories = () => {
  const navigate = useNavigate();

  const { data: categories, isPending } = categoriesAPI.useGetCategories();

  const onCategoryClick = (ID: string) => {
    navigate(routes.CATEGORY({ categoryID: ID }));
  };

  if (isPending) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {categories?.map((category) => (
        <Button
          type="button"
          variant="secondary"
          text={category.name}
          key={category.id}
          onClick={() => onCategoryClick(category.id)}
          isLoading={false}
        />
      ))}
    </div>
  );
};

export default Categories;
