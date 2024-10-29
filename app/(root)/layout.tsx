'use client'

import Footer from '@/components/footer';

const PublicLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <>
            {children}
            <Footer />
        </>
    );
};

export default PublicLayout;
