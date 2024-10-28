import { Accommodation } from '@/types/accommodation';
import Image from 'next/image';
import EmblaCarousel from '@/components/carousel';
import { EmblaOptionsType } from 'embla-carousel';

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
        <div>
            <div className='block mx-auto max-w-[calc(100vw-50px)] md:hidden'>
                <EmblaCarousel
                    slides={SLIDES}
                    options={OPTIONS}
                />
            </div>
            <p className='title'>{accommodation.title}</p>
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
            <p>{accommodation.description}</p>
            <p>Price: {accommodation.price}</p>
            <p>Location: {accommodation.location}</p>
        </div>
    );
};

export default AccommodationDetails;
