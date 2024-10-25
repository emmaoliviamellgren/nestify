'use client';

import { PrimaryButton } from '@/app/components/ui/buttons';
import { Input } from '@/app/components/ui/inputs';
import { MdErrorOutline } from 'react-icons/md';
import Link from 'next/link';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/hooks/useAuth';

type LoginFormValues = {
    email: string;
    password: string;
};

const formSchema = z.object({
    email: z.string().email({ message: 'You need to enter a valid email' }),
    password: z.string().min(1, { message: 'You need to enter a password' }),
});

const LogInPage = () => {
    const { login } = useAuth();
    const router = useRouter();

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    function onSubmit(values: LoginFormValues) {
        login(values);
        router.push('/');
    }

    return (
        <>
            <aside className='hidden md:block h-full w-screen'>
                <img
                    src='https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=465&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                    alt='Log In Image'
                    className='h-full w-full object-cover'
                />
            </aside>
            <main className='flex justify-center flex-col px-12 w-full'>
                <h2 className='text-center md:text-left'>Log In</h2>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='flex flex-col mx-auto md:mx-0 mb-12'>
                    <div className='py-8'>
                        <label className='flex flex-col gap-2 pb-6'>
                            <p className='bold'>Email adress</p>
                            <Input
                                placeholder='Email'
                                {...form.register('email')}
                            />
                        </label>
                        <label className='flex flex-col gap-2'>
                            <p className='bold'>Password</p>
                            <Input
                                type='password'
                                placeholder='Password'
                                {...form.register('password')}
                            />
                            {form.formState.errors.email && (
                                <span className='text-error text-xs mt-[2px] flex gap-1 items-center'>
                                    <MdErrorOutline />
                                    <span className='text-xs'>
                                        {form.formState.errors.email.message}
                                    </span>
                                </span>
                            )}
                        </label>
                    </div>
                    <PrimaryButton
                        type='submit'
                        label='Log in'
                        onClick={() => console.log('clicked')}
                    />
                </form>
                <span className='flex flex-col text-center md:text-left gap-0.5'>
                    <p className='caption'>Not a member?</p>
                    <Link
                        className='text-[10pt] md:text-[11pt] font-bold underline underline-offset-2 hover:no-underline hover:opacity-70'
                        href='/register'>
                        Create an account
                    </Link>
                </span>
            </main>
        </>
    );
};

export default LogInPage;
