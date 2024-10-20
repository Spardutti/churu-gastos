import Heading from '@/components/heading';
import Modal from '@/components/modal';
import AccountList from '@/features/account/components/Accounts/AccountList';
import CreateAccountForm from '@/features/account/components/CreateAccountForm';

const Accounts = () => {
  return (
    <div className="flex justify-center flex-col items-center gap-4">
      <Modal text="Create Account" title="Create Account">
        {({ closeModal }) => <CreateAccountForm closeModal={closeModal} />}
      </Modal>
      <Heading color="default" variant="h4" label="Select An Account to see its details" />
      <AccountList />
    </div>
  );
};

export default Accounts;
