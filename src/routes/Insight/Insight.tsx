import { budgetAPI } from '@/features/dashboard/api/budget';
import BarChart from '@/features/insight/components/PieChart';
import type { IRemainingBudgets } from '@/features/insight/hooks/useCalculateBudget';
import useCalculateBudget from '@/features/insight/hooks/useCalculateBudget';
import Layout from '@/layout/Layout';

interface InsightProps {}

const month = new Date().getMonth() + 1;
const year = new Date().getFullYear();

const Insight = () => {
  const { data: categoriesBudget } = budgetAPI.useGetBudget({ query: `month=${month}&year=${year}` });

  const remainingBudgets = useCalculateBudget({ categoriesBudget: categoriesBudget! });

  const onPieClick = (category: IRemainingBudgets) => {
    console.log(category.category.name);
  };

  return (
    <Layout>
      <div className="flex justify-center gap-2 items-center">
        <BarChart<IRemainingBudgets>
          data={remainingBudgets!}
          dataKey="budget"
          onPieClick={(data: IRemainingBudgets) => onPieClick(data)}
        />
      </div>
    </Layout>
  );
};

export default Insight;
