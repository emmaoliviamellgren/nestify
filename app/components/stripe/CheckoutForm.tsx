import {
    PaymentElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import { Layout } from '@stripe/stripe-js';
import { useState } from 'react';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: '/payment',
            },
        });

        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (error.type === 'card_error' || error.type === 'validation_error') {
            setMessage('Error:' + error.message);
        } else {
            setMessage('An unexpected error occurred.');
        }

        setIsLoading(false);
    };

    const paymentElementOptions = {
        layout: 'tabs' as Layout,
    };

    return (
        <>
            <form
                id='payment-form'
                onSubmit={handleSubmit}>
                <PaymentElement
                    id='payment-element'
                    options={paymentElementOptions}
                />
                <button
                    disabled={isLoading || !stripe || !elements}
                    id='submit'>
                    <span id='button-text'>
                        {isLoading ? (
                            <div
                                className='spinner'
                                id='spinner'></div>
                        ) : (
                            'Pay now'
                        )}
                    </span>
                </button>
                {/* Show any error or success messages */}
                {message && <div id='payment-message'>{message}</div>}
            </form>
            {/* [DEV]: For demo purposes only, display dynamic payment methods annotation and integration checker */}
            <div id='dpm-annotation'>
                <p>
                    Payment methods are dynamically displayed based on customer
                    location, order amount, and currency.
                    {/* <a href={dpmCheckerLink} target="_blank" rel="noopener noreferrer" id="dpm-integration-checker">Preview payment methods by transaction</a> */}
                </p>
            </div>
        </>
    );
};

export default CheckoutForm;
