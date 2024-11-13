'use client';

import { useBooking } from 'contexts/bookingProvider';
import Loading from '@/components/loading';
import Image from 'next/image';
import { OutlinedButton, PrimaryButton } from '@/components/ui/buttons';
import LabelButton from '@/components/ui/labelButton';
import { calculateOrderAmount } from '@/lib/stripe/calculateTotalAmount';
import Footer from '@/components/footer';
import Navigation from '@/components/navigation';
import useResponsive from '@/hooks/useResponsive';

const BookingDetailsPage = () => {
    const { currentBooking, cost } = useBooking();
    const { bigScreen, smallScreen } = useResponsive();

    if (!currentBooking) {
        return <Loading />;
    }

    const totalAmount = calculateOrderAmount(
        currentBooking.fromDate,
        currentBooking.toDate,
        cost
    );

    return (
        <>
            {bigScreen && <Navigation />}
            <div className='h-screen flex flex-col justify-evenly'>
                {smallScreen && <LabelButton />}
                <div className='w-screen flex flex-col justify-center gap-2'>
                    <p className='title pl-12 mt-12 mb-4'>Your trip</p>
                    <div className='py-8 bg-[--background-muted] flex flex-col'>
                        <span className='flex gap-4 pl-12'>
                            <Image
                                src={
                                    currentBooking.chosenAccommodation.images[0]
                                }
                                alt={currentBooking.chosenAccommodation.title}
                                width={2000}
                                height={2000}
                                className='size-32 object-cover rounded-sm'
                            />
                            <p className='text-2xl max-w-[22ch]'>
                                {currentBooking.chosenAccommodation.title}
                            </p>
                        </span>

                        <div className='flex flex-col gap-1'>
                            <div className='flex flex-col my-6 pl-12'>
                                <span className='flex items-center gap-1.5'>
                                    <p className='bold'>Price per night:</p>
                                    {
                                        currentBooking.chosenAccommodation.price
                                    }{' '}
                                    SEK
                                </span>
                                <span className='flex items-center gap-1.5'>
                                    <p className='bold'>Guests:</p>
                                    {currentBooking.guests}
                                </span>
                                <span className='flex items-center gap-1.5'>
                                    <p className='bold'>Selected dates:</p>
                                    {currentBooking.fromDate} -{' '}
                                    {currentBooking.toDate}
                                </span>
                            </div>
                            <div className='mx-auto'>
                                <OutlinedButton label='Edit' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='px-24 flex flex-col gap-4 items-center'>
                    <span className='flex items-center gap-1.5'>
                        <p className='bold'>Your total:</p>
                        {totalAmount} SEK
                    </span>
                    <PrimaryButton label='Book now' />
                </div>
            </div>
            {bigScreen && <Footer />}
        </>
    );
};

export default BookingDetailsPage;
