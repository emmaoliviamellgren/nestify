'use client';

import { SearchBarPrimary } from '@/components/ui/inputs';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import useResponsive from '@/hooks/useResponsive';
import Filters from '@/components/filters';
import AccommodationGrid from '@/components/accommodation/accommodationGrid';
import { useSearchAndFilter } from 'contexts/searchAndFilterProvider';
import home from '@/public/home.jpg';
import { useState, useEffect } from 'react';

const LandingPage = () => {
    const { bigScreen } = useResponsive();
    const { filteredAccommodations, search, handleSearch } =
        useSearchAndFilter();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null;

    return (
        <div>
            <Navigation />
            {bigScreen && (
                <main className='relative block sm:pl-10 lg:pl-0'>
                    <div
                        className='bg-cover bg-right'
                        style={{ backgroundImage: `url(${home.src})` }}>
                        <div className='py-24 bg-gradient-to-r from-white/40'>
                            <div className='relative z-10 max-w-6xl mx-auto'>
                                <h1>Rent your dream home</h1>
                                <h2>Where do you want to go?</h2>
                            </div>
                            <div className='relative z-10 py-9 max-w-6xl mx-auto'>
                                <SearchBarPrimary
                                    value={search}
                                    onChange={(e) =>
                                        handleSearch(e.target.value)
                                    }
                                    placeholder='Search...'
                                />
                            </div>
                        </div>
                    </div>
                </main>
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
        </div>
    );
};

export default LandingPage;
