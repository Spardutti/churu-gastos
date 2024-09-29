import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

interface IParams {
  increment?: boolean;
  decrement?: boolean;
}

const months: Record<string, number> = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
};

const useSetMonth = () => {
  const [activeDate, setActiveDate] = useState<{ month: string; year: string }>({
    month: '',
    year: '',
  });
  const [searchParams, setSearchParams] = useSearchParams();

  const setMonth = ({ increment, decrement }: IParams) => {
    const currentMonth = searchParams.get('month');
    const currentYear = searchParams.get('year');

    const isValidMonth = currentMonth && months[currentMonth] !== undefined;
    const isValidYear = currentYear && !isNaN(Number(currentYear));

    let baseDate: dayjs.Dayjs;

    if (isValidMonth && isValidYear) {
      baseDate = dayjs().set('month', months[currentMonth!]).set('year', Number(currentYear));
    } else {
      // Fallback to the current date
      baseDate = dayjs();
      searchParams.set('month', baseDate.format('MMMM'));
      searchParams.set('year', baseDate.format('YYYY'));
      setSearchParams(searchParams);
    }

    if (increment) {
      baseDate = baseDate.add(1, 'month');
    } else if (decrement) {
      baseDate = baseDate.subtract(1, 'month');
    }

    searchParams.set('month', baseDate.format('MMMM'));
    searchParams.set('year', baseDate.format('YYYY'));
    setSearchParams(searchParams);
    setActiveDate({ month: baseDate.format('MMMM'), year: baseDate.format('YYYY') });
  };

  useEffect(() => {
    setMonth({});
  }, [location.pathname]);

  return {
    setActiveMonth: setMonth,
    activeDate,
  };
};

export default useSetMonth;
