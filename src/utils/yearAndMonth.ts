export const yearAndMonth = () => {
  const date = new Date();
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1);

  return { year, month };
};
