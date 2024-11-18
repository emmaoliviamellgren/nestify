'use client';

import { auth } from '../../firebase.config';

import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    updateProfile,
    UserCredential,
} from 'firebase/auth';

import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react';
import { User } from '@/types/user';

import toast from 'react-hot-toast';
import { handleError } from '@/utils/errorHandler';
import { fetchBookings } from '@/lib/booking.db';

type AuthValues = {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
};
type AuthContextType = {
    user: User | null;
    authLoaded: boolean;
    register: (values: AuthValues) => Promise<string | void>;
    login: (values: AuthValues) => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [authLoaded, setAuthLoaded] = useState<boolean>(false);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (_user) => {
            if (_user) {
                const user: User = {
                    id: _user.uid,
                    username: _user.displayName || '',
                    email: _user.email || '',
                    password: '',
                    activeBookings: [],
                    pastBookings: [],
                };

                try {
                    const bookings = await fetchBookings(user.id);
                    user.activeBookings = bookings.activeBookings;
                    user.pastBookings = bookings.pastBookings;
                } catch (error) {
                    toast.error('Failed to fetch bookings: ' + (error as Error).message);
                }

                setUser(user);
            } else {
                setUser(null);
            }
            setAuthLoaded(true);
        });

        return () => unsub();
    }, []);

    const register = async (values: AuthValues): Promise<string | void> => {
        const toastId = toast.loading('Creating account...');

        try {
            const userCredential: UserCredential =
                await createUserWithEmailAndPassword(
                    auth,
                    values.email,
                    values.password
                );

            if (!userCredential.user) {
                throw new Error('Something went wrong!. Please try again.');
            }
            await updateProfile(userCredential.user, {
                displayName: `${values.firstName} ${values.lastName}`,
            });

            setUser(user);

            toast.success('Account created successfully', { id: toastId });

            return userCredential.user.uid;
        } catch (error: unknown) {
            handleError(error, toastId);
        }
    };

    const login = async (values: AuthValues): Promise<void> => {
        const toastId = toast.loading('Signing in...');

        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                values.email,
                values.password
            );

            if (!userCredential.user) {
                throw new Error('Something went wrong! Please try again.');
            }
            console.log(userCredential);
            await userCredential.user.getIdToken();

            toast.success('Logged in successfully', { id: toastId });
        } catch (error: unknown) {
            handleError(error, toastId);
        }
    };

    const value = {
        user,
        authLoaded,
        register,
        login,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export default AuthContextProvider;

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context)
        throw new Error('useAuth must be used within an AuthContextProvider');
    return context;
};
