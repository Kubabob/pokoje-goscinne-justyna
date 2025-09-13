'use client'
import React, { useState, useEffect, useRef } from 'react'
import RichText from '@/components/RichText'
import type { TestimonialsBlock as TestimonialsBlockProps } from '@/payload-types'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { CMSLink } from '@/components/Link'
import { Roboto_Serif } from 'next/font/google'
import { cn } from '@/utilities/ui'

const robotoSerif = Roboto_Serif({ subsets: ['latin'] })

export const TestimonialsBlock: React.FC<TestimonialsBlockProps> = (props) => {
    const { testimonials } = props
    const [currentIndex, setCurrentIndex] = useState(0)
    const [touchStart, setTouchStart] = useState(0)
    const [touchEnd, setTouchEnd] = useState(0)
    const carouselRef = useRef<HTMLDivElement>(null)

    // Auto-advance the carousel every 5 seconds
    useEffect(() => {
        if (!testimonials || testimonials.length <= 1) return

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
        }, 10000)

        return () => clearInterval(interval)
    }, [testimonials])

    const goToSlide = (index: number) => {
        setCurrentIndex(index)
    }

    const goToPrevSlide = () => {
        if (!testimonials) return
        setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
    }

    const goToNextSlide = () => {
        if (!testimonials) return
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }

    // Handle touch events for swiping
    const handleTouchStart = (e: React.TouchEvent) => {
        if (e.targetTouches?.[0]) {
            setTouchStart(e.targetTouches[0].clientX)
        }
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        if (e.targetTouches?.[0]) {
            setTouchEnd(e.targetTouches[0].clientX)
        }
    }

    const handleTouchEnd = () => {
        if (touchStart - touchEnd > 50) {
            // Swipe left
            goToNextSlide()
        }
        if (touchStart - touchEnd < -50) {
            // Swipe right
            goToPrevSlide()
        }
    }

    return (
        <div
            className="relative w-full py-12 bg-brand-white"
            data-umami-event="view-testimonials-section"
        >
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <h2
                        className={cn(
                            robotoSerif.className,
                            'text-brand-blue font-bold tracking-[0.02em] text-3xl mb-8 text-center',
                        )}
                    >
                        Opinie
                    </h2>

                    {testimonials && testimonials.length > 0 ? (
                        <div
                            className="relative flex flex-col content-center items-center"
                            id="testimonials-carousel"
                            data-carousel="slide"
                            data-umami-event="view-testimonials-carousel"
                        >
                            {/* Carousel wrapper */}
                            <div
                                className="relative overflow-visible rounded-lg h-44 w-[75vw]"
                                ref={carouselRef}
                                onTouchStart={handleTouchStart}
                                onTouchMove={handleTouchMove}
                                onTouchEnd={handleTouchEnd}
                                data-umami-event="testimonials-touch-interaction"
                            >
                                {testimonials.map((testimonial, index) => (
                                    <div
                                        key={index}
                                        className={`duration-700 ease-in-out transition-opacity ${
                                            index === currentIndex
                                                ? 'opacity-100'
                                                : 'opacity-0 absolute inset-0'
                                        }`}
                                        data-carousel-item
                                        data-umami-event={`view-testimonial-${index + 1}`}
                                    >
                                        <div className="bg-brand-white rounded-lg flex flex-col items-center">
                                            {testimonial.testimonial && (
                                                <blockquote className="mb-4 text-base text-left w-full max-w-prose">
                                                    <RichText
                                                        data={testimonial.testimonial}
                                                        className="mx-0 px-0 text-brand-blue"
                                                    />
                                                </blockquote>
                                            )}

                                            {testimonial.author && (
                                                <div className="w-full max-w-prose">
                                                    <h3 className="text-brand-blue font-medium text-lg text-left">
                                                        {testimonial.author}
                                                    </h3>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Slider indicators */}
                            <div className="relative z-30 flex gap-2 m-10">
                                {testimonials.map((_, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        className={`w-3 h-3 rounded-full ${
                                            index === currentIndex ? 'bg-gray-500' : 'bg-gray-300'
                                        }`}
                                        aria-current={index === currentIndex ? 'true' : 'false'}
                                        aria-label={`Testimonial ${index + 1}`}
                                        onClick={() => goToSlide(index)}
                                        data-carousel-slide-to={index}
                                        data-umami-event={`testimonial-indicator-click-${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center text-gray-500">No testimonials available</div>
                    )}

                    {/* Navigation buttons in separate container below */}
                    {testimonials && testimonials.length > 1 && (
                        <div className="container mx-auto mt-12">
                            <div className="flex items-center max-w-xs mx-auto justify-center gap-5">
                                <CMSLink
                                    type="custom"
                                    url="#"
                                    appearance="default"
                                    className="flex items-center justify-center w-10 h-10 bg-brand-orange text-brand-white hover:bg-brand-orange/90 focus:outline-none shadow-md"
                                    label=""
                                    onClick={(e) => {
                                        e.preventDefault()
                                        goToPrevSlide()
                                    }}
                                    data-umami-event="testimonial-prev-button-click"
                                >
                                    <ChevronLeft
                                        size={26}
                                        strokeWidth={2.5}
                                        className="flex-shrink-0"
                                    />
                                </CMSLink>

                                <CMSLink
                                    type="custom"
                                    url="#"
                                    appearance="default"
                                    className="flex items-center justify-center w-10 h-10 bg-brand-orange text-brand-white hover:bg-brand-orange/90 focus:outline-none shadow-md"
                                    label=""
                                    onClick={(e) => {
                                        e.preventDefault()
                                        goToNextSlide()
                                    }}
                                    data-umami-event="testimonial-next-button-click"
                                >
                                    <ChevronRight
                                        size={26}
                                        strokeWidth={2.5}
                                        className="flex-shrink-0"
                                    />
                                </CMSLink>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
