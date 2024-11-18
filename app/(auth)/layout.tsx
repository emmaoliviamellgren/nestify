'use client';

import { useState, useEffect } from "react";

const AuthLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null;

    return <main className='w-screen h-screen overflow-hidden'>{children}</main>;
};

export default AuthLayout;
