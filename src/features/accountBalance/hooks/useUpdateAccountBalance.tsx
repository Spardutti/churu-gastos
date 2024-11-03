import { accountBalanceAPI } from '@/features/accountBalance/api/accountBalance';

const useUpdateAccountBalance = () => {
  const { mutateAsync, isPending } = accountBalanceAPI.useUpdateAccountBalance();

  const updateBalance = async ({ id, budget }: { id: string; budget: number }) => {
    try {
      const response = await mutateAsync({ id, budget });
      console.log('response:', response);
    } catch (error) {
      console.log(error);
    }
  };
  return { updateBalance, isLoading: isPending };
};

export default useUpdateAccountBalance;
