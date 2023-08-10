export const isValidDate = (date: string | Date) => {
  const ms = new Date(date).getTime();
  return !isNaN(ms) && ms >= 0;
};
