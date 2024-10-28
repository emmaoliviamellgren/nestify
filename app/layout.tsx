import type { Metadata } from 'next';
import './globals.css';
import './embla.css';
import { lexend, familjenGrotesk } from './utils/fonts';
import { Toaster } from 'react-hot-toast';
import AuthContextProvider from './hooks/authProvider';

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
                <AuthContextProvider>
                    <>
                        <Toaster />
                        {children}
                    </>
                </AuthContextProvider>
            </body>
        </html>
    );
}
