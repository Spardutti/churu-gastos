import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

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

const useDateSelector = () => {
  const [searchParams] = useSearchParams();
  const [activeDate, setActiveDate] = useState<{ month: number | null; year: number | null }>({
    month: null,
    year: null,
  });
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

  const updateActiveDate = () => {
    const currentMonth = searchParams.get('month');
    const currentYear = searchParams.get('year');

    if (currentMonth && currentYear) {
      const monthNumber = months[currentMonth];
      if (monthNumber !== undefined) {
        setActiveDate({ month: monthNumber + 1, year: Number(currentYear) });
        setSelectedMonth(currentMonth);
      }
    }
  };

  const setMonth = ({ increment, decrement }: IParams) => {
    let baseDate: dayjs.Dayjs;

    const currentMonth = searchParams.get('month');
    const currentYear = searchParams.get('year');

    if (currentMonth && currentYear && months[currentMonth] !== undefined) {
      baseDate = dayjs().set('month', months[currentMonth]).set('year', Number(currentYear));
    } else {
      baseDate = dayjs();
    }

    if (increment) {
      baseDate = baseDate.add(1, 'month');
    } else if (decrement) {
      baseDate = baseDate.subtract(1, 'month');
    }

    const newMonth = baseDate.format('MMMM');
    const newYear = baseDate.format('YYYY');

    // Only update the search params if they're different
    if (newMonth !== currentMonth || newYear !== currentYear) {
      // Navigate with updated search params, preserving location.state
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set('month', newMonth);
      newSearchParams.set('year', newYear);

      // Use navigate to update search params and preserve state
      navigate(`${location.pathname}?${newSearchParams.toString()}`, {
        state: location.state,
        replace: true,
      });
    }
  };

  useEffect(() => {
    updateActiveDate();
  }, [searchParams]);

  useEffect(() => {
    setMonth({});
  }, []);

  return {
    setActiveMonth: setMonth,
    activeDate,
    selectedMonth,
  };
};

export default useDateSelector;
