'use server';

import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { differenceInDays, parseISO } from 'date-fns';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY || '');

export const calculateOrderAmount = (
    fromDate: string,
    toDate: string,
    price: number
): number => {
    const days = differenceInDays(parseISO(toDate), parseISO(fromDate));
    return days * price * 100; // multiplied by 100 for amount in öre (expected by Stripe)
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { fromDate, toDate, price } = req.body;

    if (!fromDate || !toDate || !price) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }

    try {
        const amount = calculateOrderAmount(fromDate, toDate, price);

        {
            /* ------ PAYMENT INTENT WITH AMOUNT + CURRENCY ------ */
        }
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'sek',
            automatic_payment_methods: {
                enabled: true,
            },
        });

        res.send({
            clientSecret: paymentIntent.client_secret
        });
    } catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
