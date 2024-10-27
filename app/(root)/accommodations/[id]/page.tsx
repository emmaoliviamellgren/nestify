import AccommodationDetails from '@/app/components/accommodationDetails';
import { useParams } from 'next/navigation';
import { Accommodation } from '@types/accommodation';

const { id } = useParams();

const HomeDetailsPage = () => {
    return <AccommodationDetails id={id as Accommodation} />;
};

export default HomeDetailsPage;
