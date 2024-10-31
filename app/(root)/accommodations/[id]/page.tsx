'use client';

import AccommodationDetails from '@/components/accommodationDetails';
import Loading from '@/components/loading';
import LabelButton from '@/components/ui/labelButton';
import { getAccommodationById } from '@/lib/accommodation.db';
import { Accommodation } from '@/types/accommodation';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const HomeDetailsPage = () => {
    const { id } = useParams();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [accommodation, setAccommodation] = useState<Accommodation | null>(
        null
    );

    useEffect(() => {
        const fetchAccommodation = async () => {
            if (typeof id == 'string') {
                try {
                    const fetchedAccommodation = await getAccommodationById(id);
                    if (fetchedAccommodation) {
                        setAccommodation(fetchedAccommodation);
                    } else {
                        console.log(
                            'No accommodation found with the given ID.'
                        );
                    }
                } catch (error) {
                    console.error('Error fetching accommodation data:', error);
                } finally {
                    setLoading(false);
                }
            } else {
                console.log('ID is not available in search parameters.');
            }
        };

        fetchAccommodation();
    }, [id, router]);

    if (loading) return <Loading />;

    return (
        <div>
            <span className='md:hidden'><LabelButton /></span>
            <AccommodationDetails accommodation={accommodation} />
        </div>
    );
};

export default HomeDetailsPage;
