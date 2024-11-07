'use client';

import { useState } from 'react';
import Filters from '@/components/filters';
import { SearchBarPrimary } from '@/components/ui/inputs';
import AccommodationGrid from '@/components/accommodation/accommodationGrid';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import { useAccommodation } from 'contexts/accommodationProvider';


const LandingPage = () => {
    
    const [value, setValue] = useState('');
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };
    const { accommodations } = useAccommodation();

    return (
        <>
            <Navigation />
            <div className='overflow-x-hidden hidden md:block md:py-6 md:px-16'>
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
            <Filters />
            <div className='overflow-x-hidden px-4 md:px-12 mx-auto'>
                <p className='title pb-2 pt-6'>Featured</p>
                <p className='hidden md:block pb-6'>
                    Take a look at our most popular accommodations!
                </p>
                <AccommodationGrid accommodations={accommodations} />
            </div>
            <Footer />
        </>
    );
};

export default LandingPage;
