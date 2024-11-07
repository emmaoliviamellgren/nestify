'use client';

import Navigation from '@/components/navigation';
import LabelButton from '@/components/ui/labelButton';
import authChecking from '@/hooks/authChecking';
import { useAuth } from 'contexts/authProvider';
import { getInitials } from '@/utils/getInitials';
import { Accommodation } from '@/types/accommodation';
import { User } from '@/types/user';
import AccommodationCardSmall from '@/components/accommodation/accommodationCardSmall';
import Footer from '@/components/footer';

const ProfilePage = () => {
    const mockAccommodation1: Accommodation = {
        id: 'acc1',
        title: 'Cozy Cottage',
        description: 'A cozy cottage in the countryside.',
        price: 100,
        location: 'Countryside',
        images: ['image1.jpg', 'image2.jpg'],
        properties: ['WiFi', 'Parking'],
    };

    const mockAccommodation2: Accommodation = {
        id: 'acc2',
        title: 'Luxury Villa',
        description: 'A luxurious villa with a private pool.',
        price: 500,
        location: 'Beachside',
        images: ['image3.jpg', 'image4.jpg'],
        properties: ['Pool', 'Gym'],
    };

    const _user: User = {
        id: '123',
        username: 'john_doe',
        firstName: 'John',
        lastName: 'Doe',
        password: 'password',
        email: 'john.doe@example.com',
        activeBookings: [
            {
                id: 'booking1',
                chosenAccommodation: mockAccommodation1,
                guests: 2,
                fromDate: new Date('2023-10-01'),
                toDate: new Date('2023-10-10'),
            },
        ],
        pastBookings: [
            {
                id: 'booking2',
                chosenAccommodation: mockAccommodation2,
                guests: 2,
                fromDate: new Date('2023-08-01'),
                toDate: new Date('2023-08-10'),
            },
        ],
    };

    const { user } = useAuth();

    return (
        <>
            <main className='w-screen min-h-screen'>
                <nav className='hidden md:block'>
                    <Navigation />
                </nav>
                <span className='md:hidden'>
                    <LabelButton />
                </span>
                <p className='title text-center md:text-left md:py-16 md:px-24 py-8'>
                    My account
                </p>
                <div className='flex flex-col gap-6 md:gap-2 md:flex-row md:justify-between'>
                    {/* ------ PROFILE CARD ------ */}
                    <section className='mt-2 mb-8 flex justify-around gap-4 mx-auto md:mx-24 p-8 bg-[--background-muted] shadow-lg min-w-[280px] md:max-h-36 outline outline-2 outline-slate-600/10 rounded-3xl'>
                        <span className='flex justify-center items-center size-20 bg-[--secondary] rounded-full border-3 border-[--primary]'>
                            <h2 className='text-[--text-secondary]'>
                                {getInitials(user?.username ?? '')}
                            </h2>
                        </span>
                        <div>
                            <p className='text-lg font-semibold pb-2'>
                                {user?.username}
                            </p>
                            <p className='caption'>Active bookings:</p>
                            <p className='caption opacity-50'>
                                Previous bookings:
                            </p>
                        </div>
                    </section>
                    <div className='flex flex-col'>
                        {/* ------ ACTIVE BOOKINGS ------ */}
                        <section className='px-8 md:px-0 py-4 md:mx-auto md:w-[900px]'>
                            <p className='bold pb-4'>Active bookings:</p>
                            {_user?.activeBookings?.map((booking) => (
                                <AccommodationCardSmall
                                    booking={booking}
                                    key={booking.id}
                                />
                            ))}
                        </section>
                        {/* ------ PREVIOUS BOOKINGS ------ */}
                        <section className='px-8 md:px-0 py-4 md:mx-auto md:w-[900px]'>
                            <p className='bold pb-4'>Previous bookings:</p>
                            {_user?.pastBookings?.map((booking) => (
                                <AccommodationCardSmall
                                    booking={booking}
                                    key={booking.id}
                                />
                            ))}
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default authChecking(ProfilePage);
