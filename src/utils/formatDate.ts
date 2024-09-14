export const formattedDate = (date: string | Date): string => {
  let newDate = date instanceof Date ? date : new Date(date);

  return newDate.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
  });
};
