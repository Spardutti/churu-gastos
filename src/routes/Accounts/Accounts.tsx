import Modal from '@/components/modal';
import AccountsList from '@/features/account/components/Accounts/Accounts';
import CreateAccountForm from '@/features/account/components/CreateAccountForm';
import CreateAccountBudgetForm from '@/features/accountBudget/components/CreateAccountBudgetForm';
import Layout from '@/layout/Layout';

const Accounts = () => {
  return (
    <Layout>
      <AccountsList />
      <div className="flex justify-center flex-col items-center gap-4">
        <Modal text="Create Account" title="Create Account">
          {({ closeModal }) => <CreateAccountForm closeModal={closeModal} />}
        </Modal>

        <Modal text="Create Account Budget" title="Create Account Budget">
          {({ closeModal }) => <CreateAccountBudgetForm closeModal={closeModal} />}
        </Modal>
      </div>
    </Layout>
  );
};

export default Accounts;
