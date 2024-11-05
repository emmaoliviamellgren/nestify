import { Accommodation } from '@/types/accommodation';
import AccommodationCardLarge from "./accommodationCardLarge";

type Props = {
    accommodations: Accommodation[];
};

const AccommodationGrid = ({ accommodations }: Props) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mx-auto">
            {accommodations.map((accommodation) => (
                <AccommodationCardLarge
                    key={accommodation.id}
                    accommodation={accommodation}
                />
            ))}
        </div>
    );
};

export default AccommodationGrid;
