'use client';

import { PrimaryButton } from '@/components/ui/buttons';
import { Input } from '@/components/ui/inputs';
import { useAuth } from 'contexts/authProvider';
import { addNewUser } from '@/lib/user.db';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { MdErrorOutline } from 'react-icons/md';
import { z } from 'zod';
import useResponsive from '@/hooks/useResponsive';

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
    const { bigScreen } = useResponsive();
    const { register } = useAuth();
    const router = useRouter();

    const { control, handleSubmit, formState } = useForm<SignUpFormValues>({
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
            console.log(values);
            await addNewUser({
                id: uid,
                username: `${values.firstName} ${values.lastName}`,
                email: values.email,
                password: values.password,
            });
            router.push('/');
            console.log('User added successfully');
        } catch (error) {
            console.error('Could not add user to database!', error);
        }
    };

    return (
        <div className='md:grid md:grid-cols-2'>
            {bigScreen && (
                <img
                    src='https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=465&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                    alt='Sign Up Image'
                    className='h-screen w-full object-cover'
                />
            )}

            <main className='flex items-center justify-center flex-col p-12 w-full'>
                <h2 className='text-center md:text-left'>Register</h2>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='w-full md:w-[450px] pt-8 md:pt-8'>
                    <div className='grid grid-cols-1 gap-y-4 pb-8 md:pb-10'>
                        {/* ------ FIRST & LAST NAME INPUT GRID ------ */}
                        <div className='grid md:grid-cols-2 gap-x-6 gap-y-4'>
                            {/* ------ FIRST NAME INPUT ------ */}
                            <div>
                                <label
                                    htmlFor='firstName'
                                    className='block leading-6 pb-2'>
                                    First name
                                </label>
                                <Controller
                                    name='firstName'
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            type='text'
                                            id='firstName'
                                            placeholder='First name'
                                            {...field}
                                        />
                                    )}
                                />
                                {formState.errors.firstName && (
                                    <span className='text-error text-xs mt-[2px] flex gap-1 items-center'>
                                        <MdErrorOutline />
                                        <span className='text-xs'>
                                            {formState.errors.firstName.message}
                                        </span>
                                    </span>
                                )}
                            </div>
                            {/* ------ LAST NAME INPUT ------ */}
                            <div>
                                <label
                                    htmlFor='lastName'
                                    className='block leading-6 pb-2'>
                                    Last name
                                </label>
                                <Controller
                                    name='lastName'
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            type='text'
                                            id='lastName'
                                            placeholder='Last name'
                                            {...field}
                                        />
                                    )}
                                />
                                {formState.errors.lastName && (
                                    <span className='text-error text-xs mt-[2px] flex gap-1 items-center'>
                                        <MdErrorOutline />
                                        <span className='text-xs'>
                                            {formState.errors.lastName.message}
                                        </span>
                                    </span>
                                )}
                            </div>
                        </div>
                        {/* ------ EMAIL INPUT ------ */}
                        <div>
                            <label
                                htmlFor='email'
                                className='block leading-6 pb-2'>
                                Email address
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
                            label='Create an account'
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
