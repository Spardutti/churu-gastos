import { accountAPI } from '@/features/account/api/account';

interface useCreateAccountProps {
  closeModal?: () => void;
}

const useCreateAccount = ({ closeModal }: useCreateAccountProps) => {
  const { mutateAsync, isPending, error } = accountAPI.useCreateAccount();

  const createAccount = async ({ name, description }: { name: string; description?: string }) => {
    await mutateAsync({ name, description });
    if (closeModal) {
      closeModal();
    }
  };

  return { createAccount, isLoading: isPending, error };
};

export default useCreateAccount;
