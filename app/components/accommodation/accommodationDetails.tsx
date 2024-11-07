'use client';

import Image from 'next/image';
import EmblaCarousel from '@/components/carousel';
import { EmblaOptionsType } from 'embla-carousel';
import iconMappingToNode from '@/components/ui/propertiesIcons';
import Navigation from '@/components/navigation';
import smilingMan from '@/public/smiling-man.jpg';
import BookingForm from '@/components/BookingForm';
import { useAccommodation } from 'contexts/accommodationProvider';
import Loading from '../loading';

const AccommodationDetails = () => {
    const { accommodation, loading } = useAccommodation();

    if (loading) return <Loading />;

    if (!accommodation)
        return <h2 className='h-screen w-screen'>No accommodation found.</h2>;

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
            {/* ------ CAROUSEL IN DEFAULT VIEW ------ */}
            <section className='block mt-5 mx-auto w-screen max-w-[calc(100vw-50px)] md:hidden'>
                <EmblaCarousel
                    slides={SLIDES}
                    options={OPTIONS}
                />
            </section>

            <nav className='hidden md:block'>
                <Navigation />
            </nav>

            {/* ------ IMAGE GRID IN DESKTOP VIEW ------ */}
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
                        {/* ------ ACCOMMODATION PROPERTY CONTAINER ------ */}
                        <div className='flex flex-col gap-4 my-6 p-3 rounded-md bg-[--background-muted] w-full'>
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
                    {/* ------ BOOKING FORM FOR DESKTOP ------ */}
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
            {/* ------ BOOKING FORM DEFAULT (MOBILE) ------ */}
            <footer className='flex flex-col md:hidden justify-between rounded-md bg-[--background-muted] border-[--primary] py-12 px-8 gap-8'>
                <BookingForm />
            </footer>
        </>
    );
};

export default AccommodationDetails;
