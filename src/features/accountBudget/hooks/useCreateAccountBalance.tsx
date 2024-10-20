import { accountBudgetAPI } from '@/features/accountBudget/api/accountBudget';

interface useCreateAccountBudgetProps {
  closeModal?: () => void;
}

const useCreateAccountBudget = ({ closeModal }: useCreateAccountBudgetProps) => {
  const { mutateAsync, isPending, error } = accountBudgetAPI.useCreateAccountBudget();

  const createBudget = async ({ amount, account_id }: { account_id: string; amount: number }) => {
    try {
      await mutateAsync({ amount, account_id });
      if (closeModal) {
        closeModal();
      }
    } catch (error) {}
  };

  return { createBudget, isLoading: isPending, error };
};

export default useCreateAccountBudget;
