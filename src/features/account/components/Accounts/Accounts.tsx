import Card from '@/components/card';
import Spinner from '@/components/spinner';
import { accountAPI } from '@/features/account/api/account';

const AccountsList = () => {
  const { data: accounts, isPending } = accountAPI.useGetAccounts();

  if (isPending) {
    return <Spinner />;
  }

  return (
    <div className="flex gap-4 flex-wrap flex-grow ">
      {accounts?.data.map((account) => (
        <Card key={account.id}>{account.name}</Card>
      ))}
    </div>
  );
};

export default AccountsList;
