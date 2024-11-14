import { SlidersHorizontal } from 'lucide-react';
import { FilterPillButton } from './ui/pillButtons';
import { useAccommodation } from 'contexts/accommodationProvider';
import { Accommodation } from '@/types/accommodation';
import { useState, useEffect } from 'react';
import { iconMappingToNode } from './ui/propertiesIcons';
import AccommodationGrid from './accommodation/accommodationGrid';
import useResponsive from '@/hooks/useResponsive';

const Accommodations = () => {
    const { accommodations } = useAccommodation();
    const { bigScreen } = useResponsive();

    const [filteredAccommodations, setFilteredAccommodations] =
        useState<Accommodation[]>(accommodations);
    const [filters, setFilters] = useState<string[]>([]);

    useEffect(() => {
        applyFilters();
    }, [filters]);

    const handleSetFilter = (filter: string) => {
        setFilters((prevFilters) => {
            if (prevFilters.includes(filter)) {
                return prevFilters.filter((f) => f !== filter);
            } else {
                return [...prevFilters, filter];
            }
        });
    };

    const applyFilters = () => {
        if (filters.length === 0) {
            setFilteredAccommodations(accommodations);
            return;
        }

        const filtered = accommodations.filter((accommodation) => {
            return filters.every((filter) =>
                accommodation.properties?.includes(filter)
            );
        });

        setFilteredAccommodations(filtered);
    };

    const filterLabels = Object.keys(iconMappingToNode);

    return (
        <>
            <div className='flex gap-3 items-center justify-center flex-wrap max-w-screen py-2 md:py-6'>
                {filterLabels.map((label) => (
                    <FilterPillButton
                        key={label}
                        icon={iconMappingToNode[label]}
                        label={label}
                        onClick={() => handleSetFilter(label)}
                        className={
                            filters.includes(label)
                                ? 'bg-[--warning] text-[--text-secondary] outline outline-white'
                                : ''
                        }
                    />
                ))}
                <FilterPillButton
                    icon={<SlidersHorizontal className='size-[1.15rem]' />}
                    label='All filters'
                    onClick={() => handleSetFilter('All filters')}
                />
            </div>
            {bigScreen && (
                <div className='px-4 mx-auto md:max-w-6xl'>
                    <p className='title pb-2 pt-6'>Featured</p>
                    <p className='block pb-6'>
                        Take a look at our most popular accommodations!
                    </p>
                </div>
            )}
            <div className='md:max-w-6xl md:mx-auto p-6'>
                <AccommodationGrid accommodations={filteredAccommodations} />
            </div>
        </>
    );
};

export default Accommodations;
