'use client';

const AuthLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return <main className='h-screen w-screen flex'>{children}</main>;
};

export default AuthLayout;
