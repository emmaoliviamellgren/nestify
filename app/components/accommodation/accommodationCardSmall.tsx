import { Booking } from '@/types/booking';
import Image from 'next/image';

type AccommodationCardSmallProps = {
    booking: Booking;
};

const AccommodationCardSmall = ({ booking }: AccommodationCardSmallProps) => {
    return (
        <div
            className='border flex rounded-lg w-[450px] transition-all'
            key={booking.chosenAccommodation.id}>
            <Image
                src='https://firebasestorage.googleapis.com/v0/b/nestify-a7b1f.appspot.com/o/Home2%2F1.jpg?alt=media&token=0642e6af-7852-469d-ba36-a3592c3d68d7'
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
                        {booking.fromDate.toDateString()} {' '}-{' '}
                        {booking.toDate.toDateString()}
                    </p>
                    <p className='caption'>{booking.guests} guests</p>
                </div>
            </div>
        </div>
    );
};

export default AccommodationCardSmall;
