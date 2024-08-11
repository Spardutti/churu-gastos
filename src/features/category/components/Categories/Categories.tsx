import { Category } from '@/features/category/types/category';
import { useGetCategoriesQuery } from '@/store/api';

const Categories = () => {
  const { data, error, isLoading, isFetching } = useGetCategoriesQuery();

  if (error) {
    return <>Oh no, there was an error</>;
  }

  if (isLoading) {
    return <>Loading...</>;
  }

  if (data?.data) {
    return (
      <div>
        {data.data.map((cat: Category) => (
          <p key={cat.id}>{cat.name}</p>
        ))}
      </div>
    );
  }

  return null;
};

export default Categories;
