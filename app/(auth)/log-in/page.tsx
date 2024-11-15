'use client';

import { PrimaryButton } from '@/components/ui/buttons';
import { Input } from '@/components/ui/inputs';
import { MdErrorOutline } from 'react-icons/md';
import Link from 'next/link';

import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useAuth } from 'contexts/authProvider';
import useResponsive from '@/hooks/useResponsive';
import Image from 'next/image';
import auth from '@/public/auth.jpg';
import LabelButton from '@/components/ui/labelButton';

type LoginFormValues = {
    email: string;
    password: string;
};

const formSchema = z.object({
    email: z.string().email({ message: 'You need to enter a valid email' }),
    password: z.string().min(1, { message: 'You need to enter a password' }),
});

const LogInPage = () => {
    const { bigScreen, smallScreen } = useResponsive();
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
            {smallScreen && <LabelButton />}
            {bigScreen && (
                <Image
                    src={auth}
                    alt='Sign Up Image'
                    className='h-screen w-full object-cover'
                />
            )}
            <main className='flex items-center justify-center flex-col p-12 w-full'>
                <h2 className='text-center md:text-left'>Log In</h2>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='w-full md:w-[450px] pt-8 md:pt-8'>
                    <div className='grid grid-cols-1 gap-y-4 pb-8 md:pb-10'>
                        {/* ------ EMAIL INPUT ------ */}
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
                                <span className='text-error text-xs flex gap-1 items-center pt-2 text-[--warning]'>
                                    <MdErrorOutline />
                                    <span className='text-xs'>
                                        {formState.errors.email?.message}
                                    </span>
                                </span>
                            )}
                        </div>
                        {/* ------ PASSWORD INPUT ------ */}
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
                                <span className='text-error text-xs flex gap-1 items-center pt-2 text-[--warning]'>
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
