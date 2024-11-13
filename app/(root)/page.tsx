'use client';

import { useState } from 'react';
import { SearchBarPrimary } from '@/components/ui/inputs';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import useResponsive from '@/hooks/useResponsive';
import Accommodations from '@/components/filters';

const LandingPage = () => {
    const [value, setValue] = useState('');
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };
    const { bigScreen } = useResponsive();

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
            <div className='px-4 mx-auto md:max-w-6xl'>
                <p className='title pb-2 pt-6'>Featured</p>
                {bigScreen && (
                    <p className='block pb-6'>
                        Take a look at our most popular accommodations!
                    </p>
                )}
            </div>
                <Accommodations />
            <Footer />
        </>
    );
};

export default LandingPage;
