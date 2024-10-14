import Button from '@/components/button/Button';
import useDateSelector from '@/features/month/hooks/useDateSelector';
import { IconArrowLeft, IconArrowRight, IconRestore } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useSearchParams } from 'react-router-dom';
interface MonthSelectorProps {
  allowSelection?: boolean;
}

const today = dayjs().format('YYYY MMMM');
const currentMonth = today.split(' ')[1];
const currentYear = today.split(' ')[0];
const MonthSelector = ({ allowSelection = true }: MonthSelectorProps) => {
  const { setActiveMonth, selectedMonth } = useDateSelector();
  const [searchParams, setSearchParams] = useSearchParams();

  const resetDate = () => {
    searchParams.set('month', currentMonth);
    searchParams.set('year', currentYear);
    setSearchParams(searchParams);
  };

  return (
    <div className="flex flex-col gap-2 w-[200px] mx-auto justify-center items-center">
      <div className="flex gap-4 items-center justify-center mx-auto">
        {allowSelection && (
          <Button
            type="button"
            variant="secondary"
            isIconOnly
            icon={<IconArrowLeft size="14px" />}
            onClick={() => setActiveMonth({ decrement: true })}
          />
        )}
        <div className="flex flex-col items-center">
          <p className="w-[80px] text-center">{selectedMonth}</p>
        </div>
        {allowSelection && (
          <Button
            type="button"
            variant="secondary"
            isIconOnly
            icon={<IconArrowRight size="14px" />}
            onClick={() => setActiveMonth({ increment: true })}
          />
        )}
      </div>
      {today.split(' ')[1] !== selectedMonth && (
        <Button variant="secondary" isIconOnly icon={<IconRestore size="14px" />} onClick={resetDate} />
      )}
    </div>
  );
};

export default MonthSelector;
