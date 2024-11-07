'use client';

import AccommodationDetails from '@/components/accommodation/accommodationDetails';
import Footer from '@/components/footer';
import LabelButton from '@/components/ui/labelButton';
import { useAccommodation } from 'contexts/accommodationProvider';

const HomeDetailsPage = () => {

    const { accommodation } = useAccommodation();

    return (
        <>
            <span className='md:hidden'>
                <LabelButton />
            </span>
            <AccommodationDetails accommodation={accommodation} />
            <span className='hidden md:block'>
                <Footer />
            </span>
        </>
    );
};

export default HomeDetailsPage;
