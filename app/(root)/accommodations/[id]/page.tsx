import AccommodationDetails from '@/components/accommodationDetails';
import { useParams } from 'next/navigation';
// import { Accommodation } from '@/types/accommodation';

const HomeDetailsPage = () => {
    const { id } = useParams();
    return <AccommodationDetails id={id} />;
};

export default HomeDetailsPage;
