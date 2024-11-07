import { DatePicker, Select, SelectItem } from '@nextui-org/react';
import { CircleUserRound } from 'lucide-react';
import { PrimaryButton } from './ui/buttons';
import { createBooking } from '@/lib/booking.db';
import { Booking } from '@/types/booking';
import { useAuth } from 'contexts/authProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { Accommodation } from '@/types/accommodation';
import { useAccommodation } from 'contexts/accommodationProvider';
import { useState } from 'react';
import { parseDate } from '@internationalized/date';

const FormSchema = z.object({
    fromDate: z.string(),
    toDate: z.string(),
    guests: z.number().int().min(1).max(7),
});

type BookingFormData = z.infer<typeof FormSchema>;

const BookingForm = () => {
    const router = useRouter();
    const { user } = useAuth();
    const { accommodation } = useAccommodation();

    const { register, handleSubmit, setValue } = useForm<BookingFormData>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            fromDate: '',
            toDate: '',
            guests: 2,
        },
    });

    const [fromDate, setFromDate] = useState<string>('');
    const [toDate, setToDate] = useState<string>('');

    const onSubmit = async (data: BookingFormData) => {
        console.log(data);
        if (!user) {
            console.error('User not authenticated');
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
            console.log(booking);
            await createBooking(user.id, booking);
            console.log('Booking created successfully');
            router.push('/');
        } catch (error) {
            console.error('Failed to create booking:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-row md:flex-col gap-4'>
                <DatePicker
                    labelPlacement='outside-left'
                    variant='faded'
                    label='Check in'
                    className='max-w-[284px] md:max-w-none flex flex-col gap-1 items-start'
                    classNames={{
                        selectorIcon: 'size-4 text-[--secondary]',
                        selectorButton: 'size-4',
                    }}
                    dateInputClassNames={{
                        label: 'text-base md:text-[1.1rem]',
                        inputWrapper: 'hover:border-[--secondary]',
                        innerWrapper: 'text-[--text-primary]',
                    }}
                    disableAnimation={true}
                    onChange={(date) => {
                        setFromDate(date.toString());
                        setValue('fromDate', date.toString());
                    }}
                    value={fromDate ? parseDate(fromDate) : null}
                />
                <DatePicker
                    labelPlacement='outside-left'
                    variant='faded'
                    label='Check out'
                    className='max-w-[284px] md:max-w-none flex flex-col gap-1 items-start'
                    classNames={{
                        selectorIcon: 'size-4 text-[--secondary]',
                        selectorButton: 'size-4',
                    }}
                    dateInputClassNames={{
                        label: 'text-base md:text-[1.1rem]',
                        inputWrapper: 'hover:border-[--secondary]',
                        innerWrapper: 'text-[--text-primary]',
                    }}
                    disableAnimation={true}
                    onChange={(date) => {
                        setToDate(date.toString());
                        setValue('toDate', date.toString());
                    }}
                    value={toDate ? parseDate(toDate) : null}
                />
                <Select
                    labelPlacement='outside-left'
                    variant='faded'
                    className='max-w-[284px] md:max-w-none flex flex-col gap-1 items-start'
                    classNames={{ label: 'text-base md:text-[1.1rem]' }}
                    defaultSelectedKeys={['2']}
                    label='Guests'
                    placeholder='2'
                    startContent={<CircleUserRound />}
                    {...register('guests')}>
                    <SelectItem key={1}>1</SelectItem>
                    <SelectItem key={2}>2</SelectItem>
                    <SelectItem key={3}>3</SelectItem>
                    <SelectItem key={4}>4</SelectItem>
                    <SelectItem key={5}>5</SelectItem>
                    <SelectItem key={6}>6</SelectItem>
                    <SelectItem key={7}>7</SelectItem>
                </Select>
            </div>
            <PrimaryButton
                label='Book now'
                type='submit'
                customWidth={true}
            />
        </form>
    );
};

export default BookingForm;
