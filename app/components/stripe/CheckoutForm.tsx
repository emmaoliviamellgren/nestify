'use client';

import { useState, useEffect } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useBooking } from 'contexts/bookingProvider';
import { useAuth } from 'contexts/authProvider';
import { createBooking } from '@/lib/booking.db';
import { LoadingButton, PrimaryButtonWithIcon } from '@/components/ui/buttons';
import { BadgeCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { currentBooking } = useBooking();
    const { user } = useAuth();
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log('User:', user);
        console.log('Current Booking:', currentBooking);
    }, [user, currentBooking]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form submitted');
        setLoading(true);

        try {
            if (!stripe || !elements) {
                console.log('Stripe.js has not loaded');
                setLoading(false);
                return;
            }

            console.log('Confirming payment...');
            const { error, paymentIntent } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: `${window.location.origin}/accommodations/${currentBooking?.chosenAccommodation.id}/${currentBooking?.id}/booking/confirmed`,
                },
                redirect: 'if_required',
            });

            if (error) {
                console.log('Payment error:', error);
                if (error.type === 'card_error' || error.type === 'validation_error') {
                    toast.error(String(error.message));
                } else {
                    toast.error('Payment failed');
                }
                setLoading(false);
                return;
            }

            if (paymentIntent && paymentIntent.status === 'succeeded') {
                console.log('Payment succeeded');
                if (user && currentBooking) {
                    console.log('Creating booking...');
                    await createBooking(user.id, currentBooking);
                    console.log('Payment and booking succeeded!');
                    router.push(`/accommodations/${currentBooking.chosenAccommodation.id}/${currentBooking.id}/booking/confirmed?payment_intent_client_secret=${paymentIntent.client_secret}`);
                } else {
                    console.log('Booking could not be created');
                }
            } else {
                console.log('Payment did not succeed');
            }
        } catch (err) {
            console.log('An error occurred:', err);
            toast.error('An error occurred during the process.');
        } finally {
            setLoading(false);
        }
    };

    const paymentElementOptions = {
        layout: 'tabs' as const,
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
                <LoadingButton
                    label='Processing...'
                    className='w-full h-[50px] flex justify-center items-center gap-2'
                />
            ) : (
                <PrimaryButtonWithIcon
                    id='submit'
                    icon={<BadgeCheck />}
                    className='w-full h-[50px] flex justify-center items-center gap-2'
                    label='Pay now'
                />
            )}
        </form>
    );
};

export default CheckoutForm;