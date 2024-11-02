'use client';

const AuthLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return <main className=' w-screen h-screen overflow-hidden'>{children}</main>;
};

export default AuthLayout;
