'use server';

import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { getAccommodationById } from '../../lib/accommodation.db';
import { calculateOrderAmount } from '../../lib/stripe/calculateTotalAmount';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY || '');

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { fromDate, toDate, accommodationId } = req.body;

    if (!fromDate || !toDate || !accommodationId) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }

    try {
        // Fetch accommodation details
        const accommodation = await getAccommodationById(accommodationId);
        if (!accommodation) {
            return res.status(404).json({ error: 'Accommodation not found' });
        }

        // Calculate the order amount
        const amount = calculateOrderAmount(
            fromDate,
            toDate,
            accommodation.price
        );
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
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
