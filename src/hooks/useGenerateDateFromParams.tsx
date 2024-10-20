import dayjs from 'dayjs';
import { useSearchParams } from 'react-router-dom';

const today = dayjs().date();

const monthMapping: { [key: string]: number } = {
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

const useGenerateDateFromParams = () => {
  const [searchParams] = useSearchParams();

  const generateCurrentDateFromParams = () => {
    const year = searchParams.get('year');
    const month = searchParams.get('month');

    if (month && year) {
      const parsedMonth = monthMapping[month];

      if (parsedMonth === undefined) {
        console.error('Invalid month name:', month);
        return dayjs()
      }

      const date = dayjs().set('year', Number(year)).set('month', parsedMonth).set('date', today);

      return date;
    } else {
      return dayjs();
    }
  };
  return generateCurrentDateFromParams;
};

export default useGenerateDateFromParams;
