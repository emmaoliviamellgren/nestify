import { db } from '../../firebase.config';
import {
    doc,
    getDoc,
    updateDoc,
    arrayUnion,
    arrayRemove,
} from 'firebase/firestore';
import toast from 'react-hot-toast';
import { Booking } from '@/types/booking';

export const createBooking = async (
    userId: string,
    booking: Booking
): Promise<void> => {
    try {
        const userDocRef = doc(db, 'Users', userId);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
            await updateDoc(userDocRef, {
                activeBookings: arrayUnion(booking),
            });

            console.log('Booking added successfully:', booking);
            toast.success('Booking added successfully!');
        } else {
            toast.error('User not found');
        }
    } catch (error) {
        toast.error('Failed to add booking: ' + (error as Error).message);
    }
};

export const fetchBookings = async (
    userId: string
): Promise<{ activeBookings: Booking[]; pastBookings: Booking[] }> => {
    try {
        const userDocRef = doc(db, 'Users', userId);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            const userData = userDoc.data();
            return {
                activeBookings: userData.activeBookings || [],
                pastBookings: userData.pastBookings || [],
            };
        } else {
            return { activeBookings: [], pastBookings: [] };
        }
    } catch (error) {
        console.log('Failed to fetch bookings: ' + (error as Error).message);
        return { activeBookings: [], pastBookings: [] };
    }
};

export const moveBooking = async (
    userId: string,
    booking: Booking
): Promise<void> => {
    try {
        const userDocRef = doc(db, 'Users', userId);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            await updateDoc(userDocRef, {
                activeBookings: arrayRemove(booking),
                pastBookings: arrayUnion(booking),
            });

            console.log(
                'Booking ' +
                    booking +
                    'has expired and was moved to past bookings'
            );
        }
    } catch (error) {
        console.log(
            'Failed to move expired booking: ' + (error as Error).message
        );
    }
};
