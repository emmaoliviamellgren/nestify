'use client';

import {
    PaymentElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import { Layout } from '@stripe/stripe-js';
import { useAccommodation } from 'contexts/accommodationProvider';
import { useState } from 'react';
import { DisabledButton, PrimaryButtonWithIcon } from '../ui/buttons';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { accommodation } = useAccommodation();

    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Payment completion page
                return_url: `/accommodations/${accommodation?.id}/booking/confirmed`,
            },
        });

        if (error.type === 'card_error' || error.type === 'validation_error') {
            setMessage('Error:' + error.message);
        } else {
            setMessage('Payment succeeded!');
        }

        setLoading(false);
    };

    const paymentElementOptions = {
        layout: 'tabs' as Layout,
    };


    return (
        <form
            id='payment-form'
            onSubmit={handleSubmit}
            className='md:max-w-5xl h-screen mx-auto flex flex-col gap-4 justify-center items-center'>
            <PaymentElement
                id='payment-element'
                options={paymentElementOptions}
            />
            {loading || !stripe || !elements ? (
                <DisabledButton label='Pay now'></DisabledButton>
            ) : (
                <PrimaryButtonWithIcon
                    id='submit'
                    label={loading ? 'Loading...' : 'Pay now'}>
                </PrimaryButtonWithIcon>
            )}

            {message && <div id='payment-message'>{message}</div>}
        </form>
    );
};

export default CheckoutForm;