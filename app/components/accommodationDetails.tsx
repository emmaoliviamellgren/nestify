'use client';

import { Accommodation } from '@/types/accommodation';
import Image from 'next/image';
import EmblaCarousel from '@/components/carousel';
import { EmblaOptionsType } from 'embla-carousel';
import iconMappingToNode from './ui/propertiesIcons';
import Navigation from './navigation';
import smilingMan from '../lib/images/smiling-man.jpg';
import BookingForm from './BookingForm';

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
            <section className='block mt-5 mx-auto w-screen max-w-[calc(100vw-50px)] md:hidden'>
                <EmblaCarousel
                    slides={SLIDES}
                    options={OPTIONS}
                />
            </section>
            <nav className='hidden md:block'>
                <Navigation />
            </nav>
            <section className='mt-6 hidden md:grid mx-auto md:mb-4 gap-2 md:grid-cols-2 md:w-[900px]'>
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
            </section>
            <main className='flex flex-col gap-2 px-8 md:px-0 py-4 md:mx-auto md:w-[900px]'>
                <section className='md:grid md:grid-cols-2 gap-[5rem]'>
                    <div>
                        <p className='title'>{accommodation.title}</p>
                        <div className='flex justify-between my-2'>
                            <span className='flex items-center gap-1'>
                                <p className='bold'>Location:</p>
                                <p>{accommodation.location}</p>
                            </span>
                            <span className='flex items-center gap-1 md:hidden'>
                                <p className='bold'>Price:</p>
                                <p>{accommodation.price} SEK / night</p>
                            </span>
                        </div>
                        <span className='flex items-center gap-1 my-6'>
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

                        <div className='flex flex-col gap-4 my-6 p-3 rounded-md bg-gray-200/60 w-full'>
                            <p className='caption'>This accommodation offers</p>
                            <span className='flex gap-4 items-center'>
                                {accommodation.properties?.map(
                                    (property, index) => (
                                        <span
                                            key={index}
                                            className='flex flex-col text-xs items-center gap-1'>
                                            {
                                                iconMappingToNode[
                                                    property as string
                                                ]
                                            }
                                            {property}
                                        </span>
                                    )
                                )}
                            </span>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p className='bold'>About this space</p>
                            <p>{accommodation.description}</p>
                        </div>
                    </div>
                    <div className='hidden md:flex md:flex-col md:justify-between rounded-md border-2 border-[--primary] p-8 gap-4'>
                        <span className='flex gap-2 items-baseline'>
                            <h2>{accommodation.price}</h2>
                            <p className='text-slate-500 relative bottom-0.5'>
                                SEK per night
                            </p>
                        </span>
                        <BookingForm />
                    </div>
                </section>
            </main>
            <footer className='flex flex-col md:hidden justify-between rounded-md bg-gray-200/60 border-[--primary] py-12 px-8 gap-8'>
            <BookingForm />
            </footer>
        </>
    );
};

export default AccommodationDetails;
