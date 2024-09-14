import type { ICategory } from '@/features/category/types/category';
import { budgetAPI } from '@/features/dashboard/api/budget';
import type { ICategoryBudget } from '@/features/dashboard/types/categoryBudget';
import BarChart from '@/features/insight/components/BarChart';
import useCalculateBudget from '@/features/insight/hooks/useCalculateBudget';
import Layout from '@/layout/Layout';

interface InsightProps {}

const Insight = () => {
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();

  const { data: categoriesBudget } = budgetAPI.useGetBudget({ query: `month=${month}&year=${year}` });

  const { remainingBudgets } = useCalculateBudget({ categoriesBudget: categoriesBudget! });
  console.log("remainingBudgets:", remainingBudgets)

  const onCategorySelect = (category: ICategory) => {};

  return (
    <Layout>
      <div>
        <p>Chose a category</p>
      </div>
      <div className="flex gap-2 flex-wrap" />
      {categoriesBudget && categoriesBudget?.length === 0 ? (
        <p>No data to show</p>
      ) : (
        <BarChart<ICategoryBudget> data={remainingBudgets!} dataKey="amount" />
      )}
    </Layout>
  );
};

export default Insight;
