'use client'

import Navigation from '@/components/navigation';
import Footer from '@/components/footer';

const PublicLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <>
            <Navigation />
            {children}
            <Footer />
        </>
    );
};

export default PublicLayout;
