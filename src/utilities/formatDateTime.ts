import { format } from 'date-fns';

export const formatDateTime = (dateTime: Date | null) => {
  if (!dateTime) return '';

  return format(dateTime, "d 'de' MMMM 'de' yyyy, HH:mm:ss");
};
