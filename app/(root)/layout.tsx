'use client'

import Navigation from '../components/navigation';

const PublicLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <>
            <Navigation />
            {children}
        </>
    );
};

export default PublicLayout;
