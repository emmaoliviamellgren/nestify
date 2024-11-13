import { parseISO, differenceInDays } from 'date-fns';

export const calculateOrderAmount = (
    fromDate: string,
    toDate: string,
    price: number
): number => {
    const days = differenceInDays(parseISO(toDate), parseISO(fromDate));
    return days * price;
};