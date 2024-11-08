import { Booking } from '@/types/booking';
import Image from 'next/image';

type AccommodationCardSmallProps = {
    booking: Booking;
};

const AccommodationCardSmall = ({ booking }: AccommodationCardSmallProps) => {
    return (
        <div
            className='border flex rounded-lg w-[450px] transition-all my-4'
            key={booking.chosenAccommodation.id}>
            <Image
                src={booking.chosenAccommodation.images[0]}
                width={200}
                height={50}
                alt={booking.chosenAccommodation.title}
            />
            <div className='flex flex-col gap-3 py-2 px-3'>
                <div className='py-1'>
                    <p className='text-lg font-semibold'>
                        {booking.chosenAccommodation.title}
                    </p>
                    <p className='text-gray-600'>
                        {booking.chosenAccommodation.location}
                    </p>
                </div>
                <div className='py-2'>
                    <p className='caption'>
                        {booking.fromDate} {' '}-{' '}
                        {booking.toDate}
                    </p>
                    <p className='caption'>{booking.guests} guests</p>
                </div>
            </div>
        </div>
    );
};

export default AccommodationCardSmall;
