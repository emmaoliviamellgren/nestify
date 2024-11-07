import { db } from '../../firebase.config';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { Booking } from '@/types/booking';

export const createBooking = async (userId: string, booking: Booking): Promise<void> => {
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

export const fetchBookings = async (userId: string): Promise<Booking[]> => {
    try {
        const userDocRef = doc(db, 'Users', userId);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            const userData = userDoc.data();
            return userData.activeBookings;
        } else {
            toast.error('User not found');
            return [];
        }
    } catch (error) {
        toast.error('Failed to fetch bookings: ' + (error as Error).message);
        return [];
    }
}

export const moveBooking = async (userId: string, booking: Booking): Promise<void> => {
    try {
        const userDocRef = doc(db, 'Users', userId);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            const pastBooking: Booking = {
                ...booking,
                fromDate: new Date(booking.fromDate).toString(),
                toDate: new Date(booking.toDate).toString(),
            };

            await updateDoc(userDocRef, {
                activeBookings: arrayRemove(booking),
                pastBookings: arrayUnion(pastBooking),
            });

            console.log('Booking moved successfully:', booking);
            toast.success('Booking moved successfully!');
        } else {
            toast.error('User not found');
        }
    } catch (error) {
        toast.error('Failed to move booking: ' + (error as Error).message);
    }
};