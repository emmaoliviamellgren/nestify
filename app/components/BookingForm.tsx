import { DatePicker, Select, SelectItem } from '@nextui-org/react';
import { CircleUserRound } from 'lucide-react';
import { PrimaryButton } from './ui/buttons';

const BookingForm = () => {
    return (
        <>
            <div className='flex flex-row md:flex-col gap-4 '>
                <DatePicker
                    labelPlacement='outside-left'
                    variant='faded'
                    label='Check in'
                    className='max-w-[284px] md:max-w-none flex flex-col gap-1 items-start'
                    dateInputClassNames={{
                        label: 'text-base md:text-[1.1rem]',
                        inputWrapper: 'hover:border-[--secondary]',
                    }}
                    disableAnimation={true}
                />

                <DatePicker
                    labelPlacement='outside-left'
                    variant='faded'
                    label='Check out'
                    className='max-w-[284px] md:max-w-none flex flex-col gap-1 items-start'
                    dateInputClassNames={{
                        label: 'text-base md:text-[1.1rem]',
                        inputWrapper: 'hover:border-[--secondary]',
                    }}
                    disableAnimation={true}
                />
                <Select
                    labelPlacement='outside-left'
                    variant='faded'
                    className='max-w-[284px] md:max-w-none flex flex-col gap-1 items-start'
                    classNames={{ label: 'text-base md:text-[1.1rem]' }}
                    defaultSelectedKeys={['2']}
                    label='Guests'
                    placeholder='2'
                    startContent={<CircleUserRound />}>
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
                customWidth={true}
            />
        </>
    );
};

export default BookingForm;
