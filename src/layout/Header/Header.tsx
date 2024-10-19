import Heading from '@/components/heading';
import NavBar from '@/components/nav/NavBar';
import Pill from '@/components/pill';
import useGetTotalAccountMonthBudget from '@/features/totalAccountBalance/hooks/useGetAccountMonthBudget';
import type { INavItems } from '@/layout/Header/types';
import routes from '@/routes/routes';
import { formatCurrency } from '@/utils/formatCurrency';
import { IconBuildingBank, IconCoinOff, IconCreditCard, IconHome2 } from '@tabler/icons-react';

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
  const totalAccountBudget = useGetTotalAccountMonthBudget();
  return (
    <div className="flex flex-col  self-stretch bg-primary-light px-4 py-2 gap-2 text-white ">
      <div className="flex justify-between flex-grow self-stretch items-center">
        <Heading color="default" label="Churu Gastos" variant="h4" />
        <Pill
          variant={Number(totalAccountBudget) < 0 ? 'danger' : 'default'}
          size="lg"
          label={formatCurrency({ amount: Number(totalAccountBudget ?? 0) })}
        />
      </div>

      <NavBar items={navItems} />
    </div>
  );
};

export default Header;
