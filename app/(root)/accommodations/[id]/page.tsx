'use client';

import AccommodationDetails from '@/components/accommodation/accommodationDetails';
import Footer from '@/components/footer';
import LabelButton from '@/components/ui/labelButton';
import useResponsive from '@/hooks/useResponsive';

const HomeDetailsPage = () => {
    const { bigScreen, smallScreen } = useResponsive();

    return (
        <>
            {smallScreen && <LabelButton />}
            <AccommodationDetails />
            {bigScreen && <Footer />}
        </>
    );
};

export default HomeDetailsPage;
