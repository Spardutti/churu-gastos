import Card from '@/components/card';
import Modal from '@/components/modal';
import MonthSelector from '@/features/month/components/MonthSelector';
import { uniqueExpenseAPI } from '@/features/uniqueExpenses/api/uniqueExpenses';
import CreateUniqueExpenseForm from '@/features/uniqueExpenses/components/CreateUniqueExpenseForm';
import UniqueExpenseTable from '@/features/uniqueExpenses/components/UniqueExpensesTable/UniqueExpensesTable';
import Layout from '@/layout/Layout';
import { formatCurrency } from '@/utils/formatCurrency';
import { yearAndMonth } from '@/utils/yearAndMonth';
import { useMemo } from 'react';

const { year, month } = yearAndMonth();

const Extras = () => {
  const { data: expenses } = uniqueExpenseAPI.useGetUniqueExpenses({
    year,
    month,
  });

  const totalExtrasExpenses = useMemo(() => {
    if (!expenses) return 0;
    return expenses.data.reduce((acc, curr) => acc + Number(curr.amount), 0);
  }, [expenses]);

  return (
    <Layout>
      <MonthSelector allowSelection={false} />
      <div className="flex items-center flex-col gap-10">
        <div className="lg:w-44 flex justify-center">
          <Card>
            <div className="flex flex-col gap-2 items-center min-w-44">
              <p>Extras</p>
              <p className="text-white font-bold">{formatCurrency({ amount: totalExtrasExpenses })}</p>
            </div>
          </Card>
        </div>
        <Modal text="Create Expense" title="Create Expense">
          {({ closeModal }) => <CreateUniqueExpenseForm closeModal={closeModal} />}
        </Modal>
        <UniqueExpenseTable />
      </div>
    </Layout>
  );
};

export default Extras;
