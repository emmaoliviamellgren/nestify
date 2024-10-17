import {
    Accessibility,
    House,
    Building,
    PawPrint,
    Trees,
    Waves,
    SlidersHorizontal,
} from 'lucide-react';
import { FilterPillButton } from './ui/pillButtons';

const Filters = () => {
    return (
        <div className='flex gap-3 items-center justify-center flex-wrap max-w-screen py-6'>
            <FilterPillButton
                icon={<Accessibility className='size-[1.15rem]'/>}
                label='Accessible'
            />
            <FilterPillButton
                icon={<House className='size-[1.15rem]'/>}
                label='Spacious'
            />
            <FilterPillButton
                icon={<Building className='size-[1.15rem]'/>}
                label='Apartment'
            />
            <FilterPillButton
                icon={<PawPrint className='size-[1.15rem]'/>}
                label='Pet friendly'
            />
            <FilterPillButton
                icon={<Trees className='size-[1.15rem]'/>}
                label='Close to nature'
            />
            <FilterPillButton
                icon={<Waves className='size-[1.15rem]'/>}
                label='Near water'
            />
            <FilterPillButton
                icon={<SlidersHorizontal className='size-[1.15rem]'/>}
                label='All filters'
            />
        </div>
    );
};

export default Filters;
