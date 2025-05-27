"use client"
import React from 'react'
import { DotButton, useDotButton } from '../organisms/EmblaCarouselDotButton'
import useEmblaCarousel from 'embla-carousel-react'

const EmblaCarousel = (props) => {
    const { title, options } = props
    const [emblaRef, emblaApi] = useEmblaCarousel(options)

    const { selectedIndex, scrollSnaps, onDotButtonClick } =
        useDotButton(emblaApi)


    return (
        <div className="m-auto space-y-6">
            {/* <div className="" ref={emblaRef}> */}
                <div className="gap-5 flex pl-5">
                    {props.children}
                </div>
            {/* </div> */}
            <div className='flex md:hidden items-center justify-center'>
                <div className="flex items-center bg-gray-700 rounded-full overflow-hidden">
                    {scrollSnaps.map((_, index) => (
                        <DotButton
                            key={index}
                            onClick={() => onDotButtonClick(index)}
                            className={`h-1 rounded-full ${index === selectedIndex ? 'w-5 bg-pink' : 'w-3'}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default EmblaCarousel