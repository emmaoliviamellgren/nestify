'use client';

import AccommodationDetails from '@/components/accommodation/accommodationDetails';
import Footer from '@/components/footer';
import LabelButton from '@/components/ui/labelButton';

const HomeDetailsPage = () => {
    return (
        <>
            <span className='md:hidden'>
                <LabelButton />
            </span>
            <AccommodationDetails />
            <span className='hidden md:block'>
                <Footer />
            </span>
        </>
    );
};

export default HomeDetailsPage;
