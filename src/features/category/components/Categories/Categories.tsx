import type { Category } from '@/features/category/types/category';

const Categories = () => {
  const { data, error, isLoading } = useGetCategoriesQuery();

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
