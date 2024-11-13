'use client'

import CompletedBooking from '@/components/stripe/CompletedBooking';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const CompletedPage = () => {
    const stripePublishableKey: string =
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '';
    const stripePromise = loadStripe(stripePublishableKey);

    return (
        <Elements stripe={stripePromise}>
            <CompletedBooking />
        </Elements>
    );
};

export default CompletedPage;