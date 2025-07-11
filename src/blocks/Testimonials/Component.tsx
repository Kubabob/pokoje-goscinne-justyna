'use client'
import React, { useState, useEffect, useRef } from 'react'
import RichText from '@/components/RichText'
import type { TestimonialsBlock as TestimonialsBlockProps } from '@/payload-types'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

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
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
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
    <div className="relative w-full py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {testimonials && testimonials.length > 0 ? (
            <div className="relative" id="testimonials-carousel" data-carousel="slide">
              {/* Carousel wrapper */}
              <div
                className="relative overflow-hidden rounded-lg"
                ref={carouselRef}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className={`duration-700 ease-in-out transition-opacity ${
                      index === currentIndex ? 'opacity-100' : 'opacity-0 absolute inset-0'
                    }`}
                    data-carousel-item
                  >
                    <div className="bg-white rounded-lg shadow-md p-6">
                      <div className="mb-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i} className="text-yellow-500">
                            ★
                          </span>
                        ))}
                      </div>

                      {testimonial.testimonial && (
                        <blockquote className="text-gray-700 italic mb-4">
                          <RichText data={testimonial.testimonial} />
                        </blockquote>
                      )}

                      {testimonial.author && <h3 className="text-black">{testimonial.author}</h3>}
                    </div>
                  </div>
                ))}
              </div>

              {/* Slider indicators */}
              <div className="absolute z-30 flex -translate-x-1/2 bottom-0 left-1/2 space-x-3 rtl:space-x-reverse">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`w-3 h-3 rounded-full ${
                      index === currentIndex ? 'bg-primary' : 'bg-gray-300'
                    }`}
                    aria-current={index === currentIndex ? 'true' : 'false'}
                    aria-label={`Testimonial ${index + 1}`}
                    onClick={() => goToSlide(index)}
                    data-carousel-slide-to={index}
                  />
                ))}
              </div>

              {/* Slider controls */}
              {testimonials.length > 1 && (
                <>
                  <button
                    type="button"
                    className="absolute top-1/2 -translate-y-1/2 left-2 z-30 flex items-center justify-center w-10 h-10 rounded-full bg-white/70 hover:bg-white focus:outline-none shadow-md"
                    data-carousel-prev
                    onClick={goToPrevSlide}
                  >
                    <ChevronLeft className="w-5 h-5" />
                    <span className="sr-only">Previous</span>
                  </button>
                  <button
                    type="button"
                    className="absolute top-1/2 -translate-y-1/2 right-2 z-30 flex items-center justify-center w-10 h-10 rounded-full bg-white/70 hover:bg-white focus:outline-none shadow-md"
                    data-carousel-next
                    onClick={goToNextSlide}
                  >
                    <ChevronRight className="w-5 h-5" />
                    <span className="sr-only">Next</span>
                  </button>
                </>
              )}
            </div>
          ) : (
            <div className="text-center text-gray-500">No testimonials available</div>
          )}
        </div>
      </div>
    </div>
  )
}
