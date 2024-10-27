import { Accommodation } from '@/types/accommodation';
import AccommodationCard from "./accommodationCard";

type Props = {
    accommodations: Accommodation[];
};

const AccommodationGrid: React.FC<Props> = ({ accommodations }) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mx-auto">
            {accommodations.map((accommodation) => (
                <AccommodationCard
                    key={accommodation.id}
                    accommodation={accommodation}
                />
            ))}
        </div>
    );
};

export default AccommodationGrid;
