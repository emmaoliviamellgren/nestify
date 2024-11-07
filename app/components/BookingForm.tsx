import { DatePicker, Select, SelectItem } from '@nextui-org/react';
import { CircleUserRound } from 'lucide-react';
import { PrimaryButton } from './ui/buttons';
import { useState } from 'react';
import { parseDate } from '@internationalized/date';
import { useBooking } from 'contexts/bookingProvider';

const BookingForm = () => {
    const { onSubmit, register, handleSubmit, setValue } = useBooking();

    const [fromDate, setFromDate] = useState<string>('');
    const [toDate, setToDate] = useState<string>('');

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
