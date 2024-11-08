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
import { fetchBookings } from '@/lib/booking.db';

const ProfilePage = () => {
    const { user } = useAuth();
    const {
        checkIfBookingExpired,
        activeBookings,
        pastBookings,
        setActiveBookings,
        setPastBookings,
    } = useBooking();

    useEffect(() => {
        if (user) {
            fetchBookings(user.id).then((bookings) => {
                setActiveBookings(bookings.activeBookings);
                setPastBookings(bookings.pastBookings);
                checkIfBookingExpired();
            });
        }
    }, [user, activeBookings, pastBookings]);

    return (
        <>
            <main className='overflow-x-hidden min-h-screen'>
                <nav className='hidden md:block'>
                    <Navigation />
                </nav>
                <span className='md:hidden'>
                    <LabelButton />
                </span>
                <p className='title text-center py-8 md:py-12 md:max-w-6xl md:mx-auto'>
                    My account
                </p>
                <div className='flex flex-col gap-6 md:gap-16 md:flex-row md:max-w-7xl md:mx-auto'>
                    {/* ------ PROFILE CARD ------ */}
                    <section className='mt-2 min-w-fit mx-auto md:mx-0 md:mt-18 mb-8 flex justify-around gap-4 p-8 bg-[--background-muted] shadow-lg md:max-h-36 outline outline-2 outline-slate-600/10 rounded-3xl'>
                        <span className='flex justify-center items-center size-20 bg-[--secondary] rounded-full border-3 border-[--primary]'>
                            <h2 className='text-[--text-secondary]'>
                                {getInitials(user?.username ?? '')}
                            </h2>
                        </span>
                        <div>
                            <p className='text-lg font-semibold pb-2'>
                                {user?.username}
                            </p>
                            <p className='caption'>
                                Active bookings: {activeBookings.length}
                            </p>
                            <p className='caption opacity-50'>
                                Previous bookings: {pastBookings.length}
                            </p>
                        </div>
                    </section>
                    <div className='flex flex-col'>
                        {/* ------ ACTIVE BOOKINGS ------ */}
                        <section className='px-8 md:px-0 py-4'>
                            <p className='bold pb-4'>Active bookings</p>
                            {activeBookings.length ? (
                                activeBookings.map((booking) => (
                                    <AccommodationCardSmall
                                        booking={booking}
                                        key={booking.id}
                                    />
                                ))
                            ) : (
                                <div className='md:w-[350px] border-3 border-[--disabled] p-5 rounded-lg border-dashed opacity-50'>
                                    <p className='text-[--disabled]'>
                                        No active bookings
                                    </p>
                                </div>
                            )}
                        </section>
                    </div>
                    <div className='flex flex-col'>
                        {/* ------ PREVIOUS BOOKINGS ------ */}
                        <section className='px-8 md:px-0 py-4'>
                            <p className='bold pb-4'>Previous bookings</p>
                            {pastBookings.length ? (
                                pastBookings.map((booking) => (
                                    <AccommodationCardSmall
                                        booking={booking}
                                        key={booking.id}
                                    />
                                ))
                            ) : (
                                <div className='md:w-[350px] border-3 border-[--disabled] p-5 rounded-lg border-dashed opacity-50'>
                                    <p className='text-[--disabled]'>
                                        No previous bookings
                                    </p>
                                </div>
                            )}
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default authChecking(ProfilePage);
