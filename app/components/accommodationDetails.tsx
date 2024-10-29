import { Accommodation } from '@/types/accommodation';
import Image from 'next/image';
import EmblaCarousel from '@/components/carousel';
import { EmblaOptionsType } from 'embla-carousel';
import iconMappingToNode from './ui/propertiesIcons';

type AccommodationDetailsProps = {
    accommodation: Accommodation | null;
};

const AccommodationDetails = ({ accommodation }: AccommodationDetailsProps) => {
    if (accommodation === null) return <h2>No accommodation found.</h2>;

    const SLIDES = [
        {
            src: accommodation.images[0],
            alt: accommodation.title,
        },
        {
            src: accommodation.images[1],
            alt: accommodation.title,
        },
        {
            src: accommodation.images[2],
            alt: accommodation.title,
        },
    ];

    const OPTIONS: EmblaOptionsType = {
        loop: true,
        dragFree: true,
        slidesToScroll: 1,
        containScroll: 'trimSnaps',
        align: 'center',
    };

    return (
        <>
            <div className='block mt-5 mx-auto w-screen max-w-[calc(100vw-50px)] md:hidden'>
                <EmblaCarousel
                    slides={SLIDES}
                    options={OPTIONS}
                />
            </div>
            <div className='hidden md:grid mx-auto gap-2 md:grid-cols-2 md:w-[800px]'>
                <div className='h-[400px]'>
                    <Image
                        src={accommodation.images[0]}
                        width={1000}
                        height={1000}
                        alt={accommodation.title}
                        className='w-full h-full object-cover rounded-lg'
                    />
                </div>
                <div className='flex md:grid gap-4 md:grid-rows-2 h-[400px]'>
                    <Image
                        src={accommodation.images[1]}
                        width={1000}
                        height={1000}
                        alt={accommodation.title}
                        className='w-full h-full object-cover rounded-lg'
                    />
                    <Image
                        src={accommodation.images[2]}
                        width={1000}
                        height={1000}
                        alt={accommodation.title}
                        className='w-full h-full object-cover rounded-lg'
                    />
                </div>
            </div>
            <div className='flex flex-col gap-2 px-8 py-4 md:px-16'>
                <p className='title'>{accommodation.title}</p>
                <div className='flex justify-between'>
                    <p>Host: Catherine</p>
                    <p>Price: {accommodation.price} SEK / night</p>
                    <p>Location: {accommodation.location}</p>
                </div>
                <div className='flex flex-col gap-2'>
                    <p className='caption'>This accommodation offers</p>
                    <span>
                        {accommodation.properties?.map((property, index) => (
                            <span key={index}>
                                {iconMappingToNode[property as string]}
                            </span>
                        ))}
                    </span>
                </div>
                <p>{accommodation.description}</p>
            </div>
        </>
    );
};

export default AccommodationDetails;
