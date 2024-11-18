'use client';

import Image from 'next/image';
import EmblaCarousel from '@/components/carousel';
import { EmblaOptionsType } from 'embla-carousel';
import { iconMappingToNode } from '@/components/ui/propertiesIcons';
import Navigation from '@/components/navigation';
import smilingMan from '@/public/smiling-man.jpg';
import BookingForm from '@/components/BookingForm';
import { useAccommodation } from 'contexts/accommodationProvider';
import useResponsive from '@/hooks/useResponsive';

const AccommodationDetails = () => {
    const { accommodation } = useAccommodation();
    const { smallScreen, bigScreen } = useResponsive();

    if (!accommodation) return null;

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
            {smallScreen && (
                <section className='block mt-5 mx-auto w-screen max-w-[calc(100vw-50px)]'>
                    <EmblaCarousel
                        slides={SLIDES}
                        options={OPTIONS}
                    />
                </section>
            )}

            {bigScreen && <Navigation />}

            {/* ------ IMAGE GRID IN DESKTOP VIEW ------ */}
            {bigScreen && (
                <section className='mt-6 grid mx-auto mb-4 gap-2 grid-cols-2 w-[900px]'>
                    <div className='h-[400px]'>
                        <Image
                            src={accommodation.images[0]}
                            width={1000}
                            height={1000}
                            alt={accommodation.title}
                            className='w-full h-full object-cover rounded-lg'
                        />
                    </div>
                    <div className='grid gap-4 grid-rows-2 h-[400px]'>
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
            )}

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
                    {bigScreen && (
                        <div className='flex flex-col justify-evenly rounded-md border-2 border-[--primary] px-4'>
                            <span className='flex gap-2 items-baseline py-3'>
                                <h2>{accommodation.price}</h2>
                                <p className='text-slate-500 relative bottom-0.5'>
                                    SEK per night
                                </p>
                            </span>
                            <BookingForm
                                onClose={() =>
                                    console.log(
                                        'Closing form when editing booking'
                                    )
                                }
                            />
                        </div>
                    )}
                </section>
            </main>

            {/* ------ BOOKING FORM DEFAULT (MOBILE) ------ */}
            {smallScreen && (
                <footer className='flex flex-col justify-between rounded-md bg-[--background-muted] border-[--primary] px-8 py-10 gap-8 mt-2'>
                    <BookingForm
                        onClose={() =>
                            console.log('Closing form when editing booking')
                        }
                    />
                </footer>
            )}
        </>
    );
};

export default AccommodationDetails;
