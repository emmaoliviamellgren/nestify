'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import Loading from '@/components/loading';
import {
    getAccommodationById,
    getAllAccommodations,
} from '@/lib/accommodation.db';
import { Accommodation } from '@/types/accommodation';
import { useParams, useRouter } from 'next/navigation';

type AccommodationContextType = {
    accommodations: Accommodation[];
    accommodation: Accommodation | null;
    fetchAccommodations: () => Promise<void>;
    loading: boolean;
};

export const AccommodationContext = createContext<
    AccommodationContextType | undefined
>(undefined);

const AccommodationContextProvider = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const { id } = useParams();
    const router = useRouter();

    const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
    const [accommodation, setAccommodation] = useState<Accommodation | null>(
        null
    );
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAccommodations();
    }, []);

    useEffect(() => {
        if (typeof id == 'string') fetchAccommodationById(id);
    }, [id, router]);

    const fetchAccommodations = async () => {
        try {
            const data: Accommodation[] = await getAllAccommodations();
            setAccommodations(data);
        } catch (error) {
            console.error('Error fetching accommodations:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchAccommodationById = async (id: string) => {
        try {
            const data: Accommodation | null = await getAccommodationById(id);
            setAccommodation(data);
        } catch (error) {
            console.error('Error fetching accommodation:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loading />;

    const value = {
        accommodations,
        accommodation,
        loading,
        fetchAccommodations,
    };

    return (
        <AccommodationContext.Provider value={value}>
            {children}
        </AccommodationContext.Provider>
    );
};

export default AccommodationContextProvider;

export const useAccommodation = () => {
    const context = useContext(AccommodationContext);
    if (!context) {
        throw new Error(
            'useAccommodation must be used within a AccommodationContextProvider'
        );
    }
    return context;
};
