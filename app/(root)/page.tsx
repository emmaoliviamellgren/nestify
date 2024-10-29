'use client';

import { useEffect, useState } from 'react';
import Filters from '@/components/filters';
import { SearchBarPrimary } from '@/components/ui/inputs';
import AccommodationGrid from '@/components/accommodationGrid';
import { Accommodation } from '@/types/accommodation';
import { getAllAccommodations } from '@/lib/accommodation.db';
import Loading from '@/components/loading';
import Navigation from '@/components/navigation';

const LandingPage = () => {
    const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
    const [loading, setLoading] = useState(true);

    const [value, setValue] = useState('');
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    useEffect(() => {
        const fetchAccommodations = async () => {
            try {
                const data: Accommodation[] = await getAllAccommodations();
                setAccommodations(data);
            } catch (error) {
                console.error('Error fetching threads:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAccommodations();
    }, []);

    if (loading) return <Loading />;

    return (
        <>
            <Navigation />
            <div className='overflow-x-hidden hidden md:block md:py-6 md:px-16'>
                <div className='py-9'>
                    <h1>Rent your dream home</h1>
                    <h2>Where do you want to go?</h2>
                </div>
                <SearchBarPrimary
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
        </>
    );
};

export default LandingPage;
