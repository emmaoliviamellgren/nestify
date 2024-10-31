'use client'

import Footer from '@/components/footer';

const PublicLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div>
            {children}
            <Footer />
        </div>
    );
};

export default PublicLayout;
