'use client';

import { createBooking, moveBooking } from '@/lib/booking.db';
import { Booking } from '@/types/booking';
import { useAuth } from 'contexts/authProvider';
import { createContext, useContext, useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    useForm,
    UseFormRegister,
    UseFormSetValue,
    UseFormHandleSubmit,
} from 'react-hook-form';
import { z } from 'zod';
import { Accommodation } from '@/types/accommodation';
import { useAccommodation } from './accommodationProvider';
import { useRouter } from 'next/navigation';

const FormSchema = z.object({
    fromDate: z.string().min(1),
    toDate: z.string().min(1),
    guests: z.number().int().min(1).max(7),
});

type BookingFormData = z.infer<typeof FormSchema>;

type BookingContextType = {
    onSubmit: (data: BookingFormData) => Promise<void>;
    checkIfBookingExpired: () => void;
    register: UseFormRegister<BookingFormData>;
    handleSubmit: UseFormHandleSubmit<BookingFormData>;
    setValue: UseFormSetValue<BookingFormData>;
    activeBookings: Booking[];
    pastBookings: Booking[];
    setActiveBookings: React.Dispatch<React.SetStateAction<Booking[]>>;
    setPastBookings: React.Dispatch<React.SetStateAction<Booking[]>>;
    currentBooking: Booking | null;
    cost: number;
    fromDate: string;
    toDate: string;
};

export const BookingContext = createContext<BookingContextType | undefined>(
    undefined
);

const BookingContextProvider = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {

    const router = useRouter();
    const { user } = useAuth();
    const { accommodation } = useAccommodation();

    const [activeBookings, setActiveBookings] = useState<Booking[]>([]);
    const [pastBookings, setPastBookings] = useState<Booking[]>([]);
    const [currentBooking, setCurrentBooking] = useState<Booking | null>(null);

    const [cost, setCost] = useState<number>(0);
    const [fromDate, setFromDate] = useState<string>('');
    const [toDate, setToDate] = useState<string>('');

    const checkIfBookingExpired = () => {
        if (user && user.activeBookings) {
            const bookings = user.activeBookings;
            bookings.forEach((booking) => {
                const bookingToDate = new Date(booking.toDate);
                const currentDate = new Date();
                if (bookingToDate < currentDate) {
                    moveBooking(user.id, booking);
                }
            });
        }
    };

    {
        /* ------ ZOD FORM HANDLING ------ */
    }

    const form = useForm<BookingFormData>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            fromDate: '',
            toDate: '',
            guests: 2,
        },
    });

    const { register, handleSubmit, setValue } = form;

    const onSubmit = async (data: BookingFormData) => {
        if (!user) {
            console.log('User not authenticated');
            return;
        }

        try {
            const booking: Booking = {
                id: Math.random().toString(16).slice(2),
                chosenAccommodation: accommodation as Accommodation,
                guests: data.guests,
                fromDate: data.fromDate,
                toDate: data.toDate,
            };

            setCost(accommodation?.price || 0)
            setFromDate(data.fromDate);
            setToDate(data.toDate);

            setCurrentBooking(booking);
            router.push(`/accommodations/${accommodation?.id}/booking/${booking.id}`);

            await createBooking(user.id, booking);

        } catch (error) {
            console.log('Failed to create booking:', error);
        }
    };

    const value = {
        onSubmit,
        checkIfBookingExpired,
        register,
        handleSubmit,
        setValue,
        activeBookings,
        setActiveBookings,
        pastBookings,
        setPastBookings,
        currentBooking,
        cost,
        fromDate,
        toDate
    };

    return (
        <BookingContext.Provider value={value}>
            {children}
        </BookingContext.Provider>
    );
};

export default BookingContextProvider;

export const useBooking = () => {
    const context = useContext(BookingContext);
    if (!context) {
        throw new Error(
            'useBooking must be used within a BookingContextProvider'
        );
    }
    return context;
};
