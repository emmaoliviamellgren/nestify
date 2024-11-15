import { Accommodation } from '@/types/accommodation';
import { db, storage } from '../../firebase.config';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import toast from 'react-hot-toast';

export const getAllAccommodations = async (): Promise<Accommodation[]> => {
    try {
        const accommodationsCollection = collection(db, 'Accommodations');
        const accommodationsSnapshot = await getDocs(accommodationsCollection);

        if (accommodationsSnapshot.empty) {
            console.log('No accommodations found.');
            return [];
        }

        const accommodations: Accommodation[] = await Promise.all(
            accommodationsSnapshot.docs.map(async (doc) => {
                const data = doc.data() as Accommodation;
                const imageRef = ref(storage, data.images[0]);
                try {
                    const imageUrl = await getDownloadURL(imageRef);
                    const filteringTags = data.properties as string[];
                    return {
                        ...data,
                        id: doc.id,
                        image: imageUrl,
                        filteringTags,
                    };
                } catch (imageError) {
                    console.error('Error fetching image URL:', imageError);
                    const filteringTags = data.properties;
                    return { ...data, id: doc.id, image: '', filteringTags };
                }
            })
        );
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
        const accommodationDoc = await getDoc(doc(db, 'Accommodations', id));
        if (!accommodationDoc.exists()) {
            console.log(`Accommodation with ID ${id} does not exist.`);
            return null;
        }

        const data = accommodationDoc.data() as Accommodation;
        const imageUrls = await Promise.all(
            data.images.map(async (imagePath: string) => {
                const imageRef = ref(storage, imagePath);
                return await getDownloadURL(imageRef);
            })
        );
        const accommodation: Accommodation = {
            ...data,
            id,
            images: imageUrls,
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
