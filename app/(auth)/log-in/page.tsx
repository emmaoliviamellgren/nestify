'use client';

import { PrimaryButton } from '@/components/ui/buttons';
import { Input } from '@/components/ui/inputs';
import { MdErrorOutline } from 'react-icons/md';
import Link from 'next/link';

import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/authProvider';

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

    const { control, handleSubmit, formState } = useForm<LoginFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    function onSubmit(values: LoginFormValues) {
        try {
            login(values);
            console.log('User logged in successfully');
            router.push('/');
        } catch (error) {
            console.error('Error logging in user!', error);
        }
    }

    return (
        <div className='md:grid md:grid-cols-2'>
            <aside className='hidden md:block'>
                <img
                    src='https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=465&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                    alt='Log In Image'
                    className='h-screen w-full object-cover'
                />
            </aside>
            <main className='flex items-center justify-center flex-col px-12 w-full'>
                <h2 className='text-center md:text-left'>Log In</h2>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='w-full md:w-[450px] pt-8 md:pt-8'>
                    <div className='grid grid-cols-1 gap-y-4 pb-8 md:pb-10'>
                        <div>
                            <label
                                htmlFor='email'
                                className='block leading-6 pb-2'>
                                Email adress
                            </label>
                            <Controller
                                name='email'
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        type='text'
                                        id='email'
                                        placeholder='Email'
                                        {...field}
                                    />
                                )}
                            />
                            {formState.errors.email && (
                                <span className='text-error text-xs mt-[2px] flex gap-1 items-center'>
                                    <MdErrorOutline />
                                    <span className='text-xs'>
                                        {formState.errors.email?.message}
                                    </span>
                                </span>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor='password'
                                className='block leading-6 pb-2'>
                                Password
                            </label>
                            <Controller
                                name='password'
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        id='password'
                                        type='password'
                                        placeholder='Password'
                                        {...field}
                                    />
                                )}
                            />
                            {formState.errors.password && (
                                <span className='text-error text-xs mt-[2px] flex gap-1 items-center'>
                                    <MdErrorOutline />
                                    <span className='text-xs'>
                                        {formState.errors.password?.message}
                                    </span>
                                </span>
                            )}
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        <PrimaryButton
                            type='submit'
                            label='Log in'
                        />
                    </div>
                    <span className='flex flex-col text-center mt-8 gap-0.5'>
                        <p className='caption'>Not a member?</p>
                        <Link
                            className='text-[10pt] md:text-[11pt] font-bold underline underline-offset-2 hover:no-underline hover:opacity-70'
                            href='/register'>
                            Create an account
                        </Link>
                    </span>
                </form>
            </main>
        </div>
    );
};

export default LogInPage;
