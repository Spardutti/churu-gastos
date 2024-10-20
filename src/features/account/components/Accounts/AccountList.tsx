import Card from '@/components/card';
import LinkWithParams from '@/components/linkWithParams';
import Spinner from '@/components/spinner';
import { accountAPI } from '@/features/account/api/account';
import routes from '@/routes/routes';

const AccountList = () => {
  const { data: accounts, isPending } = accountAPI.useGetAccounts();

  if (isPending) {
    return <Spinner />;
  }

  return (
    <div className="flex gap-4 flex-wrap flex-grow ">
      {accounts?.data.map((account) => (
        <LinkWithParams
          state={{ accountName: account.name }}
          key={account.id}
          to={routes.ACCOUNT_DETAILS({ accountId: account.id })}
        >
          <Card>{account.name}</Card>
        </LinkWithParams>
      ))}
    </div>
  );
};

export default AccountList;
