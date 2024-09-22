export const formattedDate = (date: string | Date): string => {
  const newDate = date instanceof Date ? date : new Date(date);

  // Get the browser's locale
  const browserLocale = navigator.language || 'en-US'; // Default to 'en-US' if no locale is found

  return newDate.toLocaleDateString(browserLocale, {
    day: '2-digit',
    month: 'short',
  });
};
