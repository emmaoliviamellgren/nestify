import { DatePicker, Select, SelectItem } from '@nextui-org/react';
import { CircleUserRound } from 'lucide-react';
import { PrimaryButton } from './ui/buttons';
import { useState } from 'react';
import { parseDate, DateValue } from '@internationalized/date';
import { useBooking } from 'contexts/bookingProvider';

const BookingForm = () => {
    const { onSubmit, register, handleSubmit, setValue } = useBooking();

    const [fromDate, setFromDate] = useState<string>('');
    const [toDate, setToDate] = useState<string>('');

    {
        /* ------ Setting a min value date for toDate based on fromDate ------ */
    }
    const [minValueDate, setMinValueDate] = useState<DateValue | undefined>(
        undefined
    );

    const [userSubmitted, setUserSubmitted] = useState<boolean>(false);

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-8'>
            <div className='flex flex-row md:flex-col gap-4'>
                <DatePicker
                    labelPlacement='outside-left'
                    variant='faded'
                    label='Check in'
                    className='max-w-[284px] md:max-w-none flex flex-col gap-1 items-start'
                    classNames={{
                        selectorIcon: `size-4 ${
                            !toDate && userSubmitted
                                ? 'text-red-500'
                                : 'text-[--secondary]'
                        }`,
                        selectorButton: 'size-4',
                    }}
                    dateInputClassNames={{
                        label: 'text-base md:text-[1.1rem]',
                        inputWrapper: `${
                            !toDate && userSubmitted
                                ? 'border-red-500'
                                : 'hover:border-[--secondary]'
                        }`,
                        innerWrapper: 'text-[--text-primary]',
                    }}
                    disableAnimation={true}
                    onChange={(date) => {
                        setMinValueDate(date.add({ days: 2 }));
                        setFromDate(date.toString());
                        setValue('fromDate', date.toString());
                    }}
                    value={fromDate ? parseDate(fromDate) : null}
                    isInvalid={!fromDate && userSubmitted}
                />
                <DatePicker
                    labelPlacement='outside-left'
                    variant='faded'
                    label='Check out'
                    className='max-w-[284px] md:max-w-none flex flex-col gap-1 items-start'
                    classNames={{
                        selectorIcon: `size-4 ${
                            !fromDate && userSubmitted
                                ? 'text-red-500'
                                : 'text-[--secondary]'
                        }`,
                        selectorButton: 'size-4',
                    }}
                    dateInputClassNames={{
                        label: 'text-base md:text-[1.1rem]',
                        inputWrapper: `${
                            !fromDate && userSubmitted
                                ? 'border-red-500'
                                : 'hover:border-[--secondary]'
                        }`,
                        innerWrapper: 'text-[--text-primary]',
                    }}
                    disableAnimation={true}
                    onChange={(date) => {
                        setToDate(date.toString());
                        setValue('toDate', date.toString());
                    }}
                    value={toDate ? parseDate(toDate) : null}
                    minValue={minValueDate}
                    isInvalid={!toDate && userSubmitted}
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
            <div className='flex justify-center'>
                <PrimaryButton
                    label='Reserve'
                    type='submit'
                    onClick={() => {
                        setUserSubmitted(true);
                    }}
                    customWidth={false}
                />
            </div>
        </form>
    );
};

export default BookingForm;
