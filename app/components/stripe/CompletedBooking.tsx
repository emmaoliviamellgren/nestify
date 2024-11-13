'use client';

import { useEffect, useState } from 'react';
import { useStripe } from '@stripe/react-stripe-js';
import Link from 'next/link';
import { CircleCheck, CircleX, Info } from 'lucide-react';

const SuccessIcon = <CircleCheck />;

const ErrorIcon = <CircleX />;

const InfoIcon = <Info />;

type PaymentStatus =
    | 'succeeded'
    | 'processing'
    | 'requires_payment_method'
    | 'requires_action'
    | 'requires_capture'
    | 'requires_confirmation'
    | 'canceled'
    | 'default';

const STATUS_CONTENT_MAP: Record<
    PaymentStatus,
    { text: string; icon: JSX.Element }
> = {
    succeeded: {
        text: 'Payment succeeded! 🎉',
        icon: SuccessIcon,
    },
    processing: {
        text: 'Your payment is processing... ⏳',
        icon: InfoIcon,
    },
    requires_payment_method: {
        text: 'Your payment was not successful, please try again.',
        icon: ErrorIcon,
    },
    requires_action: {
        text: 'Action required for your payment.',
        icon: InfoIcon,
    },
    requires_capture: {
        text: 'Payment requires capture.',
        icon: InfoIcon,
    },
    requires_confirmation: {
        text: 'Payment requires confirmation.',
        icon: InfoIcon,
    },
    default: {
        text: 'Something went wrong, please try again.',
        icon: ErrorIcon,
    },
    canceled: {
        text: 'Payment canceled',
        icon: ErrorIcon,
    },
};

const CompletedBooking = () => {
    const stripe = useStripe();

    const [status, setStatus] = useState<PaymentStatus>('processing');
    const [intentId, setIntentId] = useState<string | null>(null);

    useEffect(() => {
        if (!stripe) return;
        const clientSecret = new URLSearchParams(window.location.search).get(
            'payment_intent_client_secret'
        );
        if (!clientSecret) return;

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            if (!paymentIntent) return;
            setStatus(paymentIntent.status);
            setIntentId(paymentIntent.id);
        });
    }, [stripe]);

    return (
        <div
            id='payment-status'
            className='w-screen min-h-screen flex flex-col gap-4 justify-center items-center'>
            <div
                id='status-icon'>
                {STATUS_CONTENT_MAP[status].icon}
            </div>
            <h2
                id='status-text'
                className='text-[--primary]'>
                {STATUS_CONTENT_MAP[status].text}
            </h2>
            {intentId && (
                <>
                    <div id='details-table'>
                        <table>
                            <tbody>
                                <tr className='flex gap-1.5 items-center'>
                                    <td className='TableLabel'>
                                        Transaction ID:
                                    </td>
                                    <td
                                        id='intent-id'
                                        className='TableContent'>
                                        <code>{intentId}</code>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <Link
                        href={`https://dashboard.stripe.com/payments/${intentId}`}
                        id='view-details'
                        target='_blank'
                        className='flex items-center'>
                        <p className='font-semibold opacity-45'>
                            View transaction details
                        </p>
                        <svg
                            width='15'
                            height='14'
                            viewBox='0 0 15 14'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                            style={{ paddingLeft: '5px' }}>
                            <path
                                fillRule='evenodd'
                                clipRule='evenodd'
                                d='M3.125 3.49998C2.64175 3.49998 2.25 3.89173 2.25 4.37498V11.375C2.25 11.8582 2.64175 12.25 3.125 12.25H10.125C10.6082 12.25 11 11.8582 11 11.375V9.62498C11 9.14173 11.3918 8.74998 11.875 8.74998C12.3582 8.74998 12.75 9.14173 12.75 9.62498V11.375C12.75 12.8247 11.5747 14 10.125 14H3.125C1.67525 14 0.5 12.8247 0.5 11.375V4.37498C0.5 2.92524 1.67525 1.74998 3.125 1.74998H4.875C5.35825 1.74998 5.75 2.14173 5.75 2.62498C5.75 3.10823 5.35825 3.49998 4.875 3.49998H3.125Z'
                                fill='#0055DE'
                            />
                            <path
                                d='M8.66672 0C8.18347 0 7.79172 0.391751 7.79172 0.875C7.79172 1.35825 8.18347 1.75 8.66672 1.75H11.5126L4.83967 8.42295C4.49796 8.76466 4.49796 9.31868 4.83967 9.66039C5.18138 10.0021 5.7354 10.0021 6.07711 9.66039L12.7501 2.98744V5.83333C12.7501 6.31658 13.1418 6.70833 13.6251 6.70833C14.1083 6.70833 14.5001 6.31658 14.5001 5.83333V0.875C14.5001 0.391751 14.1083 0 13.6251 0H8.66672Z'
                                fill='#0055DE'
                            />
                        </svg>
                    </Link>
                </>
            )}
            <Link href='/'>Back to home page</Link>
        </div>
    );
};

export default CompletedBooking;
