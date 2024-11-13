'use client';

import { useEffect, useState } from 'react';
import { loadStripe, Appearance } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '@/components/stripe/CheckoutForm';
import { useBooking } from 'contexts/bookingProvider';
import Loading from '@/components/loading';
import CompletedPage from './confirmed/page';

const stripePublishableKey: string =
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '';
const stripePromise = loadStripe(stripePublishableKey);

const PaymentPage = () => {
    const [clientSecret, setClientSecret] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [paymentIntent, setPaymentIntent] = useState<string | null>(null);
    const [confirmed, setConfirmed] = useState(false);

    useEffect(() => {
        setPaymentIntent(
            new URLSearchParams(window.location.search).get(
                'payment_intent_client_secret'
            )
        );

        if (paymentIntent !== null) {
            setConfirmed(true);
            console.log('Payment intent was set');
        } else {
            console.log('Payment intent was not set');
        }
    }, []);

    const { cost, fromDate, toDate } = useBooking();
    const API = '/api/create-payment-intent';

    useEffect(() => {
        setLoading(true);
        fetch(API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cost, fromDate, toDate }),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then((data) => {
                setClientSecret(data.clientSecret);
                setLoading(false);
                if (!data.clientSecret) {
                    setError('Failed to retrieve client secret');
                }
            })
            .catch((error) => {
                console.error('Error fetching payment intent:', error);
                setError('Error fetching payment intent');
                setLoading(false);
            });
    }, [cost, fromDate, toDate]);

    const appearance = {
        theme: 'stripe' as Appearance['theme'],
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <>
            {loading && <Loading />}
            {error && (
                <div className='w-screen h-screen'>
                    <h2>{error}</h2>
                </div>
            )}
            {clientSecret && (
                <Elements
                    options={options}
                    stripe={stripePromise}>
                    {confirmed ? <CompletedPage /> : <CheckoutForm />}
                </Elements>
            )}
        </>
    );
};

export default PaymentPage;
