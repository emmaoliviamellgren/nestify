import React from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import { PrevButton, NextButton, usePrevNextButtons } from './carouselButtons';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';

type Slide = {
    src: string;
    alt: string;
};

type PropType = {
    slides: Slide[];
    options?: EmblaOptionsType;
};

const EmblaCarousel = (props: PropType) => {
    const { slides, options } = props;
    const [emblaRef, emblaApi] = useEmblaCarousel(options);

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick,
    } = usePrevNextButtons(emblaApi);

    return (
        <section className='embla'>
            <div
                className='embla__viewport'
                ref={emblaRef}>
                <div className='embla__container'>
                    {slides.map((slide, index) => (
                        <div
                            className='embla__slide'
                            key={index}>
                            <Image
                                src={slide.src}
                                alt={slide.alt}
                                width={1000}
                                height={1000}
                                className='embla__slide__img'
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className='embla__controls'>
                <div className='embla__buttons'>
                    <PrevButton
                        onClick={onPrevButtonClick}
                        disabled={prevBtnDisabled}
                    />
                    <NextButton
                        onClick={onNextButtonClick}
                        disabled={nextBtnDisabled}
                    />
                </div>
            </div>
        </section>
    );
};

export default EmblaCarousel;
