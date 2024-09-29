import Button from '@/components/button/Button';
import useDateSelector from '@/features/month/hooks/useDateSelector';
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';

const MonthSelector = () => {
  const { setActiveMonth, selectedMonth } = useDateSelector();

  return (
    <div className="flex gap-4 items-center justify-center mx-auto">
      <Button
        type="button"
        variant="secondary"
        isIconOnly
        icon={<ArrowLeftIcon />}
        onClick={() => setActiveMonth({ decrement: true })}
      />
      <p className="w-[80px] text-center">{selectedMonth}</p>
      <Button
        type="button"
        variant="secondary"
        isIconOnly
        icon={<ArrowRightIcon />}
        onClick={() => setActiveMonth({ increment: true })}
      />
    </div>
  );
};

export default MonthSelector;
