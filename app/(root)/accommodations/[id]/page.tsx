'use client';

import AccommodationDetails from '@/components/accommodation/accommodationDetails';
import Footer from '@/components/footer';
import LabelButton from '@/components/ui/labelButton';
import useResponsive from '@/hooks/useResponsive';

const HomeDetailsPage = () => {
    const { bigScreen, smallScreen } = useResponsive();

    return (
        <main className='h-full min-h-screen'>
            {smallScreen && <LabelButton />}
            <AccommodationDetails />
            {bigScreen && <Footer />}
        </main>
    );
};

export default HomeDetailsPage;
