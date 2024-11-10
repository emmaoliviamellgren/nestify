// import { parseISO, differenceInDays } from 'date-fns';

// export const calculateOrderAmount = (
//     fromDate: string,
//     toDate: string,
//     price: number
// ): number => {
//     const days = differenceInDays(parseISO(toDate), parseISO(fromDate));
//     return days * price * 100; // Stripe expects the amount in cents (öre for SEK)
// };

import { parseISO, differenceInDays } from 'date-fns';

export const calculateOrderAmount = (
    fromDate: string,
    toDate: string,
    price: number
): number => {
    if (!fromDate || !toDate || !price) {
        console.error('Invalid input values:', { fromDate, toDate, price });
        return 0;
    }

    console.log('From date:', fromDate, 'To date:', toDate, 'Price:', price);
    const days = differenceInDays(parseISO(toDate), parseISO(fromDate));
    return days * price * 100; // Stripe expects the amount in cents (öre for SEK)
};