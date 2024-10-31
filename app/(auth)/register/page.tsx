'use client';

import { PrimaryButton } from '@/components/ui/buttons';
import { Input } from '@/components/ui/inputs';
import { useAuth } from '@/hooks/authProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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

const RegisterPage = () => {
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
        <div>
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
                    className='w-full md:w-[450px] pt-8 md:pt-8'>
                    <div className='grid grid-cols-1 gap-y-4 pb-8 md:pb-10'>
                        <div className='grid md:grid-cols-2 gap-x-6 gap-y-4'>
                            <div>
                                <label
                                    htmlFor='firstName'
                                    className='block leading-6 pb-2'>
                                    First name
                                </label>
                                <Input
                                    id='firstName'
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
                            </div>
                            <div>
                                <label
                                    htmlFor='lastName'
                                    className='block leading-6 pb-2'>
                                    Last name
                                </label>
                                <Input
                                    id='lastName'
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
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor='email'
                                className='block leading-6 pb-2'>
                                Email adress
                            </label>
                            <Input
                                id='email'
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
                        </div>
                        <div>
                            <label
                                htmlFor='password'
                                className='block leading-6 pb-2'>
                                Password
                            </label>
                            <Input
                                id='password'
                                type='password'
                                placeholder='Password'
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
                        </div>
                        <div>
                            <label
                                htmlFor='confirmPassword'
                                className='block leading-6 pb-2'>
                                Confirm Password
                            </label>
                            <Input
                                id='confirmPassword'
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
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        <PrimaryButton
                            type='submit'
                            label='Create an account'
                            onClick={() => console.log('clicked')}
                        />
                    </div>
                    <span className='flex flex-col text-center mt-8 gap-0.5'>
                        <p className='caption'>Already a member?</p>
                        <Link
                            className='text-[10pt] md:text-[11pt] font-bold underline underline-offset-2 hover:no-underline hover:opacity-70'
                            href='/log-in'>
                            Log in
                        </Link>
                    </span>
                </form>
            </main>
        </div>
    );
};

export default RegisterPage;
