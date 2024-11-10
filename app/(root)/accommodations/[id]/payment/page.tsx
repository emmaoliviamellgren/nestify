'use client';

import { useEffect, useState } from 'react';
import { loadStripe, Appearance } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '@/components/stripe/CheckoutForm';
import { useBooking } from 'contexts/bookingProvider';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
const stripePublishableKey: string =
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '';
const stripePromise = loadStripe(stripePublishableKey);

// type PaymentPageProps = {
//     fromDate: string;
//     toDate: string;
//     price: number;
// };

const PaymentPage = (
    // { fromDate, toDate, price }: PaymentPageProps
) => {
    const [clientSecret, setClientSecret] = useState('');
    const { cost, fromDate, toDate } = useBooking();
    const API = 'api/create-payment-intent/route.ts';

    useEffect(() => {
        fetch(API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cost, fromDate, toDate }),
        })
            .then((res) => res.json())
            .then((data) => {
                setClientSecret(data.clientSecret);
            });
    }, []);

    const appearance = {
        theme: 'stripe' as Appearance['theme'],
        variables: {
            colorPrimary: 'var(--primary)',
            colorBackground: 'var(--background)',
            colorText: 'var(--text-primary)',
        },
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <>
            {clientSecret && (
                <Elements
                    options={options}
                    stripe={stripePromise}>
                    <CheckoutForm
                        // fromDate={fromDate}
                        // toDate={toDate}
                        // cost={cost}
                    />
                </Elements>
            )}
        </>
    );
};

// const [confirmed, setConfirmed] = useState(false);

// useEffect(() => {
//     setConfirmed(
//         new URLSearchParams(window.location.search).get(
//             'payment_intent_client_secret'
//         )
//     );
// });

// {/* {confirmed ? ( */}
// <CompletePage />
// {/* ) : ( */}
// <CheckoutForm
// // dpmCheckerLink={dpmCheckerLink}
// />
// {/* )} */}

export default PaymentPage;
