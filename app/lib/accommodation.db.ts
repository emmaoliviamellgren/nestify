import { Accommodation } from '@/app/types/accommodation';
import { db } from '@/firebase.config';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import toast from 'react-hot-toast';

export const getAllAccommodations = async (): Promise<Accommodation[]> => {
    try {
        const accommodationsCollection = collection(db, 'accommodations');
        const accommodationsSnapshot = await getDocs(accommodationsCollection);
        const accommodations: Accommodation[] = await Promise.all(
            accommodationsSnapshot.docs.map(async (doc) => {
                const data = doc.data() as Accommodation;
                const accommodation: Accommodation = {
                    ...data,
                    id: doc.id,
                };

                return accommodation;
            })
        );
        return accommodations;
    } catch (error) {
        toast.error('Failed to fetch threads: ' + (error as Error).message);
        return [];
    }
};

export const getAccommodationById = async (
    id: string
): Promise<Accommodation | null> => {
    try {
        const accommodationDoc = await getDoc(doc(db, 'accommodations', id));
        if (!accommodationDoc.exists()) {
            console.log(`Accommodation with ID ${id} does not exist.`);
            return null;
        }

        const data = accommodationDoc.data() as Accommodation;
        const accommodation: Accommodation = {
            ...data,
            id,
        };

        return accommodation;
    } catch (error) {
        toast.error('Failed to fetch thread: ' + (error as Error).message);
        console.error('Error fetching thread:', error);
        return null;
    }
};
