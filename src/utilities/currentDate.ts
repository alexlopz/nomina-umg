import { format } from 'date-fns';

export const currentDateUtil = () => {
  const currentDate = new Date();
  return format(currentDate, 'dd/MM/yyyy HH:mm:ss');
};
