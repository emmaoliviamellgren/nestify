import { Accommodation } from '@/types/accommodation';
import Image from 'next/image';
import iconMappingToNode from '@/components/ui/propertiesIcons';
import { useRouter } from 'next/navigation';

type Props = {
    accommodation: Accommodation;
};

const AccommodationCardLarge = ({ accommodation }: Props) => {
    const router = useRouter();
    return (
        <div
            className='border rounded-lg max-w-[300px] cursor-pointer transition-all hover:shadow-lg hover:shadow-blue-400/30'
            onClick={() => router.push(`/accommodations/${accommodation.id}`)}>
            <Image
                src={accommodation.images[0]}
                width={300}
                height={200}
                alt={accommodation.title}
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

export default AccommodationCardLarge;
