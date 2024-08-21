import Heading from '@/components/heading';
import { setDate } from '@/features/month/components/store/monthSlice';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

interface MonthProps {}

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const Month = () => {
  const dispatch = useDispatch();
  const [monthIndex, setMonthIndex] = useState(() => new Date().getMonth());

  const selectMonth = (month: number) => {
    setMonthIndex(month);
  };

  useEffect(() => {
    const year = new Date().getFullYear();
    const formattedMonth = String(monthIndex + 1).padStart(2, '0');
    const dateString = `${year}-${formattedMonth}`;
    dispatch(setDate({ date: dateString }));
  }, [monthIndex, dispatch]);

  return (
    <div className="flex gap-2 items-end self-stretch justify-around">
      <button onClick={() => selectMonth(monthIndex - 1)}>{monthNames[monthIndex - 1]}</button>
      <Heading label={monthNames[monthIndex]} variant="h3" />
      <button onClick={() => setMonthIndex(monthIndex + 1)}>{monthNames[monthIndex + 1]}</button>
    </div>
  );
};

export default Month;
