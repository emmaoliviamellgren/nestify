'use server';

import Stripe from 'stripe';
import { calculateOrderAmount } from '../../lib/stripe/calculateTotalAmount';
import { NextRequest, NextResponse } from 'next/server';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY || '');

export async function POST(req: NextRequest) {
    const { fromDate, toDate, cost } = await req.json();

    if (!fromDate || !toDate || !cost) {
        return NextResponse.json(
            { error: 'Missing required parameters' },
            { status: 400 }
        );
    }

    try {
        const amount = calculateOrderAmount(fromDate, toDate, cost  * 100);
        // Stripe expects the amount in cents (öre for SEK)
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

        return NextResponse.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error('Error creating payment intent:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
