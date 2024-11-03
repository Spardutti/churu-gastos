import Heading from '@/components/heading';
import NavBar from '@/components/nav/NavBar';
import type { INavItems } from '@/layout/Header/types';
import routes from '@/routes/routes';
import { formatCurrency } from '@/utils/formatCurrency';
import { IconBuildingBank, IconCoinOff, IconCreditCard, IconHome2 } from '@tabler/icons-react';
import Popover from '@/components/popover';
import Button from '@/components/button';
import useAccountsMonthBalance from '@/features/accountBalance/hooks/useGetAccountMonthBudget';

const navItems: INavItems[] = [
  {
    label: 'Dashboard',
    href: routes.DASHBOARD(),
    icon: <IconHome2 size={16} />,
  },
  {
    label: 'Extras',
    href: routes.EXTRAS(),
    icon: <IconCoinOff size={16} />,
  },
  {
    label: 'Cards',
    href: routes.CARDS(),
    icon: <IconCreditCard size={16} />,
  },
  {
    label: 'Accounts',
    href: routes.ACCOUNTS(),
    icon: <IconBuildingBank size={16} />,
  },
];

const Header = () => {
  const { total, accounts } = useAccountsMonthBalance();
  return (
    <div className="flex flex-col  self-stretch bg-primary-light px-4 py-2 gap-2 text-white ">
      <div className="flex justify-between flex-grow self-stretch items-center">
        <Heading color="default" label="Churu Gastos" variant="h4" />

        <Popover
          trigger={<Button variant="primary" text={`Balance ${formatCurrency({ amount: Number(total ?? 0) })}`} />}
          content={
            <div>
              {accounts?.map((account) => (
                <div className="flex gap-2" key={account.name}>
                  <span>{account.name}</span>
                  <span className="text-main-primary-text">{formatCurrency({ amount: Number(account.balance) })}</span>
                </div>
              ))}
            </div>
          }
        />
      </div>

      <NavBar items={navItems} />
    </div>
  );
};

export default Header;
