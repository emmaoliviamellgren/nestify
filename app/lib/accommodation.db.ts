import { Accommodation } from '@/app/types/accommodation';
import { db, storage } from '@/firebase.config';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import toast from 'react-hot-toast';

export const getAllAccommodations = async (): Promise<Accommodation[]> => {
    try {
        const accommodationsCollection = collection(db, 'Accommodations');
        console.log('Fetching accommodations from Firestore:', accommodationsCollection);
        const accommodationsSnapshot = await getDocs(accommodationsCollection);
        console.log('Accommodations snapshot:', accommodationsSnapshot);

        if (accommodationsSnapshot.empty) {
            console.log('No accommodations found.');
            return [];
        }

        const accommodations: Accommodation[] = await Promise.all(
            accommodationsSnapshot.docs.map(async (doc) => {
                const data = doc.data() as Accommodation;
                console.log('Accommodation data:', data);

                if (!data.image) {
                    console.log('No image field found for accommodation:', doc.id);
                    return { ...data, id: doc.id, image: '' };
                }

                const imageRef = ref(storage, data.image);
                console.log('Image reference:', imageRef);

                try {
                    const imageUrl = await getDownloadURL(imageRef);
                    console.log('Image URL:', imageUrl);
                    return { ...data, id: doc.id, image: imageUrl };
                } catch (imageError) {
                    console.error('Error fetching image URL:', imageError);
                    return { ...data, id: doc.id, image: '' };
                }
            })
        );

        console.log('Fetched accommodations:', accommodations);
        return accommodations;
    } catch (error) {
        toast.error(
            'Failed to fetch accommodations: ' + (error as Error).message
        );
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
        const imageRef = ref(storage, data.image);
        const imageUrl = await getDownloadURL(imageRef);
        const accommodation: Accommodation = {
            ...data,
            id,
            image: imageUrl,
        };

        return accommodation;
    } catch (error) {
        toast.error(
            'Failed to fetch accommodation: ' + (error as Error).message
        );
        console.error('Error fetching accommodation:', error);
        return null;
    }
};
