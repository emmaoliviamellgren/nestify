import { Accommodation } from '../types/accommodation';
import iconMappingToNode from './ui/propertiesIcons';

type Props = {
    accommodation: Accommodation;
};

const AccommodationCard = ({ accommodation }: Props) => {
    return (
        <div className='border rounded-lg max-w-[300px]'>
            <img
                src={accommodation.image}
                alt={accommodation.title}
                // className='w-full h-48 object-cover'
            />

            <div className='p-4'>
                <h3 className='text-lg font-bold'>{accommodation.title}</h3>
                <p className='text-gray-600'>{accommodation.location}</p>
                <p className='text-gray-900 font-semibold'>
                    {accommodation.price} SEK
                </p>
                <span className='flex space-x-2 mt-2'>
                    {accommodation.properties?.map((property, index) => (
                        <span key={index}>
                            {iconMappingToNode[property as string]}
                        </span>
                    ))}
                </span>
            </div>
        </div>
    );
};

export default AccommodationCard;
