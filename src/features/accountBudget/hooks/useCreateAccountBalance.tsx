import { accountBudgetAPI } from '@/features/accountBudget/api/accountBudget';

interface useCreateAccountBudgetProps {
  closeModal?: () => void;
}

const useCreateAccountBudget = ({ closeModal }: useCreateAccountBudgetProps) => {
  const { mutateAsync, isPending, error } = accountBudgetAPI.useCreateAccountBudget();

  const createBudget = async ({ amount, category_id }: { category_id: string; amount: number }) => {
    await mutateAsync({ amount, category_id });
    if (closeModal) {
      closeModal();
    }
  };

  return { createBudget, isLoading: isPending, error };
};

export default useCreateAccountBudget;
