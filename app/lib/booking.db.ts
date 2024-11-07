import { db } from '../../firebase.config';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
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