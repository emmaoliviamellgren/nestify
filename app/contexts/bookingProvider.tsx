'use client';

import { moveBooking } from '@/lib/booking.db';
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
import { useRouter, usePathname } from 'next/navigation';

const FormSchema = z.object({
    fromDate: z.string().min(1),
    toDate: z.string().min(1),
    guests: z.string().min(1).max(7),
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
    isEditingBooking: boolean;
    setIsEditingBooking: React.Dispatch<React.SetStateAction<boolean>>;
    currentBooking: Booking | null;
    cost: number;
    fromDate: string;
    toDate: string;
    setFromDate: React.Dispatch<React.SetStateAction<string>>;
    setToDate: React.Dispatch<React.SetStateAction<string>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
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
    const pathname = usePathname();

    const { user } = useAuth();
    const { accommodation } = useAccommodation();

    const [isEditingBooking, setIsEditingBooking] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);

    const [activeBookings, setActiveBookings] = useState<Booking[]>([]);
    const [pastBookings, setPastBookings] = useState<Booking[]>([]);
    const [currentBooking, setCurrentBooking] = useState<Booking | null>(null);

    const [cost, setCost] = useState<number>(0);
    const [fromDate, setFromDate] = useState<string>(
        currentBooking?.fromDate || ''
    );
    const [toDate, setToDate] = useState<string>(currentBooking?.toDate || '');

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
            fromDate: currentBooking?.fromDate || '',
            toDate: currentBooking?.toDate || '',
            guests: currentBooking?.guests || '2',
        },
    });

    const { register, handleSubmit, setValue } = form;

    useEffect(() => {
        {
            /* ------ Resetting form if user doesn't navigate to next page/ continuing booking process ------ */
        }
        if (pathname === '/') {
            console.log('Resetting form because of this pathname: ', pathname);
            form.reset({
                fromDate: '',
                toDate: '',
                guests: '2',
            });
            setFromDate('');
            setToDate('');
        }
    }, [form, fromDate, toDate, currentBooking, pathname]);

    const onSubmit = async (data: BookingFormData) => {
        console.log('Form is submitting');
        if (!user) {
            console.log('User not authenticated');
            return;
        }

        setIsEditingBooking(false);
        setLoading(true);
        try {
            const booking: Booking = {
                id: Math.random().toString(16).slice(2),
                chosenAccommodation: accommodation as Accommodation,
                guests: data.guests,
                fromDate: data.fromDate,
                toDate: data.toDate,
            };

            setCost(accommodation?.price || 0);
            setFromDate(data.fromDate);
            setToDate(data.toDate);

            setCurrentBooking(booking);
            router.push(`/accommodations/${accommodation?.id}/${booking.id}`);
        } catch (error) {
            console.log('Failed to create booking object:', error);
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
        isEditingBooking,
        setIsEditingBooking,
        currentBooking,
        cost,
        fromDate,
        toDate,
        setFromDate,
        setToDate,
        loading,
        setLoading,
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
