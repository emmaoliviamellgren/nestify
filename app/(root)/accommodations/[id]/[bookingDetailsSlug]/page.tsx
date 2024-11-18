'use client';

import { useBooking } from 'contexts/bookingProvider';
import Loading from '@/components/loading';
import Image from 'next/image';
import { LoadingButton, PrimaryButton } from '@/components/ui/buttons';
import LabelButton from '@/components/ui/labelButton';
import { calculateOrderAmount } from '@/lib/stripe/calculateTotalAmount';
import Footer from '@/components/footer';
import Navigation from '@/components/navigation';
import useResponsive from '@/hooks/useResponsive';
import { useRouter } from 'next/navigation';
import { useDateFormatter } from '@react-aria/i18n';
import BookingEditForm from '@/components/BookingEditForm';
import { useState } from 'react';

const BookingDetailsPage = () => {
    const { currentBooking, cost } = useBooking();
    const { bigScreen, smallScreen } = useResponsive();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const formatter = useDateFormatter({ dateStyle: 'full' });

    if (!currentBooking) {
        return <Loading />;
    }

    {
        /* ------ Better display of dates for better UX ------ */
    }
    const fromDate = new Date(currentBooking.fromDate);
    const toDate = new Date(currentBooking.toDate);

    const totalAmount = calculateOrderAmount(
        currentBooking.fromDate,
        currentBooking.toDate,
        cost
    );

    const redirectToBooking = () => {
        setLoading(true);
        console.log('Redirecting', currentBooking);
        try {
            router.push(
                `/accommodations/${currentBooking.chosenAccommodation.id}/${currentBooking.id}/booking`
            );
        } catch (error) {
            console.error('Failed to redirect to booking page: ', error);
        }
    };

    return (
        <>
            {bigScreen && <Navigation />}
            <div className='h-screen flex flex-col justify-evenly md:max-w-6xl md:mx-auto'>
                {smallScreen && <LabelButton />}
                <div className='flex flex-col justify-center gap-2'>
                    <p className='title mx-auto mt-1 mb-4 md:mx-0 md:pl-12 md:mt-12 md:mb-0'>
                        Your trip
                    </p>
                    <div className='py-8 bg-[--background-muted] md:bg-[--background] flex flex-col'>
                        <span className='flex gap-4 px-12 md:px-0 md:max-w-[1200px]'>
                            <Image
                                src={
                                    currentBooking.chosenAccommodation.images[0]
                                }
                                alt={currentBooking.chosenAccommodation.title}
                                width={2000}
                                height={2000}
                                className='size-32 md:h-52 md:w-full object-cover rounded-sm'
                            />
                            {smallScreen && (
                                <div className='max-w-full'>
                                    <p className='text-2xl'>
                                        {
                                            currentBooking.chosenAccommodation
                                                .title
                                        }
                                    </p>
                                    <p className='text-default-500 text-wrap text-sm truncate line-clamp-3 sm:line-clamp-4'>
                                        {
                                            currentBooking.chosenAccommodation
                                                .description
                                        }
                                    </p>
                                </div>
                            )}
                        </span>

                        <div className='flex flex-col gap-1'>
                            <div className='flex flex-col gap-4 my-6 pl-12 md:pl-0 md:max-w-[1200px]'>
                                {bigScreen && (
                                    <div className='flex justify-between'>
                                        <h2 className='mb-4'>
                                            {
                                                currentBooking
                                                    .chosenAccommodation.title
                                            }
                                        </h2>
                                        <BookingEditForm />
                                    </div>
                                )}
                                <span className='flex flex-col md:flex-row md:items-center gap-0.5 md:gap-1.5'>
                                    <p className='bold'>Price per night</p>
                                    {
                                        currentBooking.chosenAccommodation.price
                                    }{' '}
                                    SEK
                                </span>
                                <span className='flex flex-col md:flex-row md:items-center gap-0.5 md:gap-1.5'>
                                    <p className='bold'>Guests</p>
                                    {currentBooking.guests}
                                </span>
                                <span className='flex flex-col md:flex-row md:items-center gap-0.5 md:gap-1.5'>
                                    <p className='bold'>Selected dates</p>
                                    {formatter.format(fromDate)} -{' '}
                                    {formatter.format(toDate)}
                                </span>
                            </div>
                            {smallScreen && <BookingEditForm />}
                        </div>
                    </div>
                </div>
                <div className='px-24 md:my-12 flex flex-col gap-4 items-center'>
                    <span className='flex items-center gap-1.5'>
                        <p className='bold'>Your total:</p>
                        {totalAmount} SEK
                    </span>
                    {loading ? (
                        <LoadingButton
                            label='Processing...'
                            className='flex justify-center items-center gap-2 h-12 w-full'
                        />
                    ) : (
                        <PrimaryButton
                            label='Book now'
                            onClick={redirectToBooking}
                            className='h-12 w-full'
                        />
                    )}
                </div>
            </div>
            {bigScreen && <Footer />}
        </>
    );
};

export default BookingDetailsPage;
