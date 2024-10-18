'use client';

import { useState } from 'react';
import Filters from '../components/filters';
import { SearchBarPrimary } from '../components/ui/inputs';
import Accommodation from '../components/accommodation';

const LandingPage = () => {
    const [value, setValue] = useState('');
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };
    return (
        <>
            <div className='hidden md:block'>
                <h1>Rent your dream home</h1>
                <h2>Where do you want to go?</h2>
                <SearchBarPrimary
                    onChange={handleChange}
                    value={value}
                />
            </div>
            <Filters />
            <Accommodation />
        </>
    );
};

export default LandingPage;
