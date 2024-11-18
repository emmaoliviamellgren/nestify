import type { Metadata } from 'next';
import './globals.css';
import './embla.css';
import { lexend, familjenGrotesk } from './utils/fonts';
import { Toaster } from 'react-hot-toast';
import AuthContextProvider from './contexts/authProvider';
// import { NextUIProvider } from '@nextui-org/react';
import BookingContextProvider from 'contexts/bookingProvider';
import AccommodationContextProvider from 'contexts/accommodationProvider';
import SearchAndFilterProvider from 'contexts/searchAndFilterProvider';


export const metadata: Metadata = {
    title: 'Nestify',
    description: 'Book your next stay with Nestify',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body
                className={`${lexend.variable} ${familjenGrotesk.variable} antialiased`} suppressHydrationWarning>
                {/* <NextUIProvider locale='en-GB'> */}
                    <AccommodationContextProvider>
                        <SearchAndFilterProvider>
                            <AuthContextProvider>
                                <BookingContextProvider>
                                    <Toaster />
                                    {children}
                                </BookingContextProvider>
                            </AuthContextProvider>
                        </SearchAndFilterProvider>
                    </AccommodationContextProvider>
                {/* </NextUIProvider> */}
            </body>
        </html>
    );
}
