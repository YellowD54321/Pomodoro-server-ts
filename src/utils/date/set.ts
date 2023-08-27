import { isValidDate } from "./check";

export const getBeginDate = (date: Date | string): Date => {
  if (!isValidDate(date)) {
    throw new Error(
      "date must be Date type or string which can be transformed to valid date."
    );
  }
  const begin = new Date(date);
  begin.setHours(0, 0, 0, 0);
  return begin;
};

export const getEndDate = (date: Date | string): Date => {
  if (!isValidDate(date)) {
    throw new Error(
      "date must be Date type or string which can be transformed to valid date."
    );
  }
  const begin = new Date(date);
  begin.setHours(23, 59, 59, 999);
  return begin;
};
