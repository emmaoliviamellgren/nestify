'use client';

import { createBooking } from '@/lib/booking.db';
import { Booking } from '@/types/booking';
import { useAuth } from 'contexts/authProvider';
import { createContext, useContext } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';

const FormSchema = z.object({
    fromDate: z.string().datetime(),
    toDate: z.string().datetime(),
    guests: z.number().int().min(1).max(7),
});

type BookingFormData = z.infer<typeof FormSchema>;

type BookingContextType = {
    form: UseFormReturn<BookingFormData>;
    FormSchema: typeof FormSchema;
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

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        console.log(data);
        if (!user) {
            console.error('User not authenticated');
            return;
        }

        try {
            const booking: Booking = {
                id: '',
                chosenAccommodation: {
                    id: '',
                    title: '',
                    description: '',
                    location: '',
                    price: 0,
                    images: [],
                },
                guests: data.guests,
                fromDate: data.fromDate,
                toDate: data.toDate,
            };

            await createBooking(user.id, booking);
            console.log('Booking created successfully');
            router.push('/');
        } catch (error) {
            console.error('Failed to create booking:', error);
        }
    };

    const value = {
        onSubmit,
        FormSchema,
        form,
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
