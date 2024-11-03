import { Appearance, loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '@/components/stripe/CheckoutForm';
import CompletePage from '@/components/stripe/CompletePage';
import { useEffect, useState } from 'react';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.

const stripePublishableKey: string =
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '';
const stripePromise = loadStripe(stripePublishableKey);

const PaymentPage = () => {
    const [clientSecret, setClientSecret] = useState('');
    // const [dpmCheckerLink, setDpmCheckerLink] = useState('');
    // const [confirmed, setConfirmed] = useState(false);

    // useEffect(() => {
    //     setConfirmed(
    //         new URLSearchParams(window.location.search).get(
    //             'payment_intent_client_secret'
    //         )
    //     );
    // });

    useEffect(() => {
        fetch('@/lib/stripe/create-payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items: [{ id: 'xl-tshirt' }] }),
        })
            .then((res) => res.json())
            .then((data) => {
                setClientSecret(data.clientSecret);
                // setDpmCheckerLink(data.dpmCheckerLink);
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

    return (
        <div className='App'>
            {clientSecret && (
                <Elements
                    options={{
                        clientSecret,
                        appearance,
                    }}
                    stripe={stripePromise}>
                    {/* {confirmed ? ( */}
                    <CompletePage />
                    {/* ) : ( */}
                    <CheckoutForm
                    // dpmCheckerLink={dpmCheckerLink}
                    />
                    {/* )} */}
                </Elements>
            )}
        </div>
    );
};

export default PaymentPage;
