'use client';

import {
    PaymentElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import { Layout } from '@stripe/stripe-js';
import { useState } from 'react';
import { DisabledButtonWithIcon, PrimaryButtonWithIcon } from '../ui/buttons';
import { useBooking } from 'contexts/bookingProvider';
import { createBooking } from '@/lib/booking.db';
import { useAuth } from 'contexts/authProvider';
import { BadgeCheck, Loader } from 'lucide-react';
import Link from 'next/link';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { currentBooking } = useBooking();
    const { user } = useAuth();

    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setLoading(true);

        if (user && currentBooking) {
            try {
                await createBooking(user.id, currentBooking);
                console.log('Payment and booking succeeded!');
            } catch (err) {
                console.log('Booking could not be created: ' + err);
            }
        } else {
            console.log('Booking could not be created');
        }

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/accommodations/${currentBooking?.chosenAccommodation.id}/${currentBooking?.id}/booking/confirmed`,
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
        style: {
            base: {
                color: '#0b132b',
                fontFamily: 'familjenGrotesk, sans-serif',
            },
        },
    };

    return (
        <form
            id='payment-form'
            onSubmit={handleSubmit}
            className='md:max-w-xl md:mx-auto px-12 md:px-0 h-screen flex flex-col gap-12 justify-center'>
            <PaymentElement
                id='payment-element'
                options={paymentElementOptions}
            />
            {loading || !stripe || !elements ? (
                <DisabledButtonWithIcon
                icon={<Loader />}
                label='Processing...'
                className='w-full h-[50px] flex justify-center items-center gap-2'
            />
            ) : (
                <>
                    <PrimaryButtonWithIcon
                        id='submit'
                        icon={<BadgeCheck />}
                        className='w-full h-[50px] flex justify-center items-center gap-2'
                        label={
                            loading ? 'Loading...' : 'Pay now'
                        }></PrimaryButtonWithIcon>
                    <span className='flex gap-1 justify-center items-center'>
                        <span className='text-sm md:text-base'>or</span>
                        <Link
                            href='/'
                            className='underline text-sm md:text-base'>
                            cancel
                        </Link>
                    </span>
                </>
            )}

            {message && <div id='payment-message'>{message}</div>}
        </form>
    );
};

export default CheckoutForm;
