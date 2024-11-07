'use client';

import Navigation from '@/components/navigation';
import LabelButton from '@/components/ui/labelButton';
import authChecking from '@/hooks/authChecking';
import { useAuth } from 'contexts/authProvider';
import { getInitials } from '@/utils/getInitials';
import AccommodationCardSmall from '@/components/accommodation/accommodationCardSmall';
import Footer from '@/components/footer';
import { useEffect } from 'react';
import { useBooking } from 'contexts/bookingProvider';

const ProfilePage = () => {

    const { user } = useAuth();
    const { checkIfBookingExpired } = useBooking();
    
    useEffect(() => {
        checkIfBookingExpired();
    }, [user]);

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
                            {user?.activeBookings?.map((booking) => (
                                <AccommodationCardSmall
                                    booking={booking}
                                    key={booking.id}
                                />
                            ))}
                        </section>
                        {/* ------ PREVIOUS BOOKINGS ------ */}
                        <section className='px-8 md:px-0 py-4 md:mx-auto md:w-[900px]'>
                            <p className='bold pb-4'>Previous bookings:</p>
                            {user?.pastBookings?.map((booking) => (
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
