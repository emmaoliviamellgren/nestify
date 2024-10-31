import type { Metadata } from 'next';
import './globals.css';
import './embla.css';
import { lexend, familjenGrotesk } from './utils/fonts';
import { Toaster } from 'react-hot-toast';
import AuthContextProvider from './hooks/authProvider';
import { NextUIProvider } from '@nextui-org/react';

export const metadata: Metadata = {
    title: 'Nestify',
    description: 'Where to?',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body
                className={`${lexend.variable} ${familjenGrotesk.variable} antialiased`}>
                <NextUIProvider>
                    <AuthContextProvider>
                        <Toaster />
                        {children}
                    </AuthContextProvider>
                </NextUIProvider>
            </body>
        </html>
    );
}
