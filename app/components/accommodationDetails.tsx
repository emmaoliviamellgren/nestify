import { Accommodation } from '@/types/accommodation';
import Image from 'next/image';

type AccommodationDetailsProps = {
    accommodation: Accommodation | null;
};

const AccommodationDetails = ({ accommodation }: AccommodationDetailsProps) => {
    
    if (accommodation === null) return <h2>No accommodation found.</h2>;

    return (
        <div>
            <h1>{accommodation.title}</h1>
            <Image
                src={accommodation.image}
                width={400}
                height={300}
                alt={accommodation.title}
            />
            <p>{accommodation.description}</p>
            <p>Price: {accommodation.price}</p>
            <p>Location: {accommodation.location}</p>
        </div>
    );
};

export default AccommodationDetails;
