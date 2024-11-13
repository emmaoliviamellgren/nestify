'use client';

import { useBooking } from 'contexts/bookingProvider';
import Loading from '@/components/loading';
import Image from 'next/image';
import { OutlinedButtonWithIcon, PrimaryButton } from '@/components/ui/buttons';
import LabelButton from '@/components/ui/labelButton';
import { calculateOrderAmount } from '@/lib/stripe/calculateTotalAmount';
import Footer from '@/components/footer';
import Navigation from '@/components/navigation';
import useResponsive from '@/hooks/useResponsive';
import { useRouter } from 'next/navigation';
import { MdEdit } from 'react-icons/md';

const BookingDetailsPage = () => {
    const { currentBooking, cost } = useBooking();
    const { bigScreen, smallScreen } = useResponsive();
    const router = useRouter();

    if (!currentBooking) {
        return <Loading />;
    }

    const totalAmount = calculateOrderAmount(
        currentBooking.fromDate,
        currentBooking.toDate,
        cost
    );

    const redirectToBooking = () => {
        router.push(
            `/accommodations/${currentBooking.chosenAccommodation.id}/${currentBooking.id}/booking`
        );
    };

    return (
        <>
            {bigScreen && <Navigation />}
            <div className='h-screen flex flex-col justify-evenly md:max-w-6xl md:mx-auto'>
                {smallScreen && <LabelButton />}
                <div className='w-screen flex flex-col justify-center gap-2'>
                    <p className='title pl-12 mt-12 mb-4 md:mb-0'>Your trip</p>
                    <div className='py-8 bg-[--background-muted] md:bg-[--background] flex flex-col'>
                        <span className='flex gap-4 pl-12 md:max-w-[1200px]'>
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
                                <p className='text-2xl max-w-[22ch]'>
                                    {currentBooking.chosenAccommodation.title}
                                </p>
                            )}
                        </span>

                        <div className='flex flex-col gap-1'>
                            <div className='flex flex-col my-6 pl-12 md:max-w-[1200px]'>
                                {bigScreen && (
                                    <div className='flex justify-between'>
                                        <h2 className='mb-4'>
                                            {
                                                currentBooking
                                                    .chosenAccommodation.title
                                            }
                                        </h2>
                                        <OutlinedButtonWithIcon
                                            icon={<MdEdit />}
                                            label='Edit'
                                            className='h-9 flex justify-center items-center gap-2'
                                        />
                                    </div>
                                )}
                                <span className='flex items-center gap-1.5'>
                                    <p className='bold'>Price per night:</p>
                                    {currentBooking.chosenAccommodation.price}
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
                            {smallScreen && (
                                <OutlinedButtonWithIcon
                                    icon={<MdEdit />}
                                    label='Edit'
                                    className='mx-auto flex justify-center items-center gap-2'
                                />
                            )}
                        </div>
                    </div>
                </div>
                <div className='px-24 md:my-12 flex flex-col gap-4 items-center'>
                    <span className='flex items-center gap-1.5'>
                        <p className='bold'>Your total:</p>
                        {totalAmount} SEK
                    </span>
                    <PrimaryButton
                        label='Book now'
                        onClick={redirectToBooking}
                        className='h-12 w-full'
                    />
                </div>
            </div>
            {bigScreen && <Footer />}
        </>
    );
};

export default BookingDetailsPage;
