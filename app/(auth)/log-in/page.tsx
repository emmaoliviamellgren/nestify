'use client';

import { PrimaryButton } from '@/app/components/ui/buttons';

const LogInPage = () => {
    return (
        <>
            <aside className='hidden md:block h-full'>
                <img
                    src='https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=465&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                    alt='Log In Image'
                    className='h-full w-full object-cover'
                />
            </aside>
            <main className='flex justify-center flex-col px-12 w-full'>
                <h2>Log In</h2>
                <form className='flex flex-col'>
                    <input
                        type='email'
                        placeholder='Email'
                    />
                    <input
                        type='password'
                        placeholder='Password'
                    />
                    <PrimaryButton
                        label='Log in'
                        onClick={() => console.log('clicked')}
                    />
                </form>
            </main>
        </>
    );
};

export default LogInPage;
