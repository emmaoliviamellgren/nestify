'use client';

import { useState } from 'react';
import { SearchBarPrimary } from '@/components/ui/inputs';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import useResponsive from '@/hooks/useResponsive';
import Filters from '@/components/filters';
import AccommodationGrid from '@/components/accommodation/accommodationGrid';
import { useSearchAndFilter } from 'contexts/searchAndFilterProvider';

const LandingPage = () => {
    const [value, setValue] = useState('');
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };
    const { bigScreen } = useResponsive();
    const { filteredAccommodations } = useSearchAndFilter();

    return (
        <>
            <Navigation />
            {bigScreen && (
                <div className='block mx-auto py-6 max-w-6xl sm:pl-10 lg:pl-0'>
                    <div className='py-9'>
                        <h1>Rent your dream home</h1>
                        <h2>Where do you want to go?</h2>
                    </div>
                    <SearchBarPrimary
                        placeholder='Search...'
                        onChange={handleChange}
                        value={value}
                    />
                </div>
            )}
            <Filters />
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
            <Footer />
        </>
    );
};

export default LandingPage;
