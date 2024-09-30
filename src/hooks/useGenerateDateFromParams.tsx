import dayjs from 'dayjs';
import { useSearchParams } from 'react-router-dom';

const useGenerateDateFromParams = () => {
  const [searchParams] = useSearchParams();

  const generateCurrentDateFromParams = () => {
    const year = searchParams.get('year');
    const month = searchParams.get('month');

    if (month && year) {
      return dayjs(`${year}-${month + 1}-01`);
    } else {
      return dayjs();
    }
  };
  return generateCurrentDateFromParams;
};

export default useGenerateDateFromParams;
