import { format, parseISO } from 'date-fns';

export const formatDate = (dateString: string) => {
  const parsedDate = parseISO(dateString);
  return format(parsedDate, 'dd/MM/yyyy');
};
