'use client';

import { PrimaryButton } from '@/app/components/ui/buttons';
import { Input } from '@/app/components/ui/inputs';
import { useAuth } from '@/app/hooks/useAuth';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { MdErrorOutline } from 'react-icons/md';
import { z } from 'zod';

type SignUpFormValues = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};

const formSchema = z.object({
    email: z.string().email({ message: 'You need to enter a valid email' }),
    firstName: z.string().min(1, { message: 'You need to enter a first name' }),
    lastName: z.string().min(1, { message: 'You need to enter a last name' }),
    password: z.string().min(6, {
        message: 'The password must be at least 6 characters long',
    }),
});

export const RegisterPage = () => {
    const { register } = useAuth();
    const router = useRouter();

    const form = useForm<SignUpFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        },
    });

    const onSubmit = async (values: SignUpFormValues) => {
        try {
            const uid = await register(values);
            if (!uid) {
                throw new Error('Registration failed, no user ID returned');
            }
            // await addNewUser({
            //     id: uid,
            //     username: `${values.firstName} ${values.lastName}`,
            //     name: '',
            //     email: values.email,
            //     password: values.password,
            // });
            router.push('/');
            console.log('User added successfully');
        } catch (error) {
            console.error('Could not add user to database!', error);
        }
    };

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
                <h2 className='text-center md:text-left'>Register</h2>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='flex flex-col mx-auto md:mx-0 mb-12'>
                    <div className='py-8'>
                        <div className='flex w-full'>
                            <label className='flex flex-col gap-2 pb-6 w-1/2'>
                                <p className='bold'>First name</p>
                                <Input
                                    placeholder='First name'
                                    {...form.register('firstName')}
                                />
                                {form.formState.errors.firstName && (
                                    <span className='text-error text-xs mt-[2px] flex gap-1 items-center'>
                                        <MdErrorOutline />
                                        <span className='text-xs'>
                                            {
                                                form.formState.errors.firstName
                                                    .message
                                            }
                                        </span>
                                    </span>
                                )}
                            </label>
                            <label className='flex flex-col gap-2 pb-6'>
                                <p className='bold'>Last name</p>
                                <Input
                                    placeholder='Last name'
                                    {...form.register('lastName')}
                                />
                                {form.formState.errors.lastName && (
                                    <span className='text-error text-xs mt-[2px] flex gap-1 items-center'>
                                        <MdErrorOutline />
                                        <span className='text-xs'>
                                            {
                                                form.formState.errors.lastName
                                                    .message
                                            }
                                        </span>
                                    </span>
                                )}
                            </label>
                        </div>
                        <label className='flex flex-col gap-2 pb-6'>
                            <p className='bold'>Email adress</p>
                            <Input
                                placeholder='Email'
                                {...form.register('email')}
                            />
                            {form.formState.errors.email && (
                                <span className='text-error text-xs mt-[2px] flex gap-1 items-center'>
                                    <MdErrorOutline />
                                    <span className='text-xs'>
                                        {form.formState.errors.email?.message}
                                    </span>
                                </span>
                            )}
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
                        <label className='flex flex-col gap-2'>
                            <p className='bold'>Confirm password</p>
                            <Input
                                type='password'
                                placeholder='Confirm Password'
                                {...form.register('password')}
                            />
                            {form.formState.errors.password && (
                                <span className='text-error text-xs mt-[2px] flex gap-1 items-center'>
                                    <MdErrorOutline />
                                    <span className='text-xs'>
                                        {form.formState.errors.password.message}
                                    </span>
                                </span>
                            )}
                        </label>
                    </div>
                    <PrimaryButton
                        type='submit'
                        label='Create an account'
                        onClick={() => console.log('clicked')}
                    />
                </form>
                <span className='flex flex-col text-center md:text-left gap-0.5'>
                    <p className='caption'>Already a member?</p>
                    <Link
                        className='text-[10pt] md:text-[11pt] font-bold underline underline-offset-2 hover:no-underline hover:opacity-70'
                        href='/register'>
                        Log in
                    </Link>
                </span>
            </main>
        </>
    );
};
