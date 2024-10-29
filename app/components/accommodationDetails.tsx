import { Accommodation } from '@/types/accommodation';
import Image from 'next/image';
import EmblaCarousel from '@/components/carousel';
import { EmblaOptionsType } from 'embla-carousel';
import iconMappingToNode from './ui/propertiesIcons';
import Navigation from './navigation';
import smilingMan from '../lib/images/smiling-man.jpg';

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
            <span className='hidden md:block'>
                <Navigation />
            </span>
            <div className='mt-6 hidden md:grid mx-auto gap-2 md:grid-cols-2 md:w-[800px]'>
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
                <div className='mb-4'>
                    <p className='title'>{accommodation.title}</p>
                    <div className='flex justify-between'>
                        <span className='flex items-center gap-1'>
                            <p className='bold'>Location:</p>
                            <p>{accommodation.location}</p>
                        </span>
                        <span className='flex items-center gap-1'>
                            <p className='bold'>Price:</p>
                            <p>{accommodation.price} SEK / night</p>
                        </span>
                    </div>
                </div>
                <div className='flex justify-between'>
                    <span className='flex items-center gap-1'>
                        <Image
                            src={smilingMan}
                            alt='Host'
                            width={40}
                            height={40}
                            className='rounded-full object-cover aspect-square'
                        />
                        <p className='bold pl-2'>Hosted by</p>
                        <p>Alex</p>
                    </span>
                </div>
                <div className='flex flex-col gap-4 my-6'>
                    <p className='caption'>This accommodation offers</p>
                    <span className='flex gap-4 items-center'>
                        {accommodation.properties?.map((property, index) => (
                            <span
                                key={index}
                                className='flex flex-col text-xs items-center gap-1'>
                                {iconMappingToNode[property as string]}
                                {property}
                            </span>
                        ))}
                    </span>
                </div>
                <div className='flex flex-col gap-2'>
                    <p className='bold'>About this space</p>
                    <p>{accommodation.description}</p>
                </div>
            </div>
        </>
    );
};

export default AccommodationDetails;
