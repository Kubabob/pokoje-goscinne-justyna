'use client'
import type { StaticImageData } from 'next/image'
import { cn } from '@/utilities/ui'
import React, { useState, useEffect, useRef } from 'react'
import RichText from '@/components/RichText'
import type { ExpandableBlock as ExpandableBlockProps } from '@/payload-types'
import { Button } from '@/components/ui/button'
import { Media } from '@/components/Media'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'

type Props = ExpandableBlockProps & {
  imgClassName?: string
  staticImage?: StaticImageData
}

export const ExpandableBlock: React.FC<Props> = (props) => {
  const {
    enableMedia,
    mediaItems,
    title,
    enableButton,
    buttonText,
    inside,
    staticImage,
    imgClassName,
    mediaSize,
  } = props

  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Auto-advance the carousel every 10 seconds
  // useEffect(() => {
  //   if (!mediaItems || mediaItems.length <= 1) return

  //   const interval = setInterval(() => {
  //     setCurrentIndex((prevIndex) => (prevIndex + 1) % mediaItems.length)
  //   }, 10000)

  //   return () => clearInterval(interval)
  // }, [mediaItems])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToPrevSlide = () => {
    if (!mediaItems) return
    setCurrentIndex((prevIndex) => (prevIndex - 1 + mediaItems.length) % mediaItems.length)
  }

  const goToNextSlide = () => {
    if (!mediaItems) return
    setCurrentIndex((prevIndex) => (prevIndex + 1) % mediaItems.length)
  }

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
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
    <div className="w-[75vw] mx-auto border-brand-blue border-2 border-solid rounded">
      <div className={`transition-all duration-500 ease-in-out`}>
        {/* Photo Slider */}
        {mediaItems && mediaItems.length > 0 && (
          <div className="relative overflow-hidden">
            <div
              className="relative rounded-t-lg"
              ref={carouselRef}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {mediaItems.map(({ media }, index) => (
                <div
                  key={index}
                  className={`duration-700 ease-in-out transition-opacity ${
                    index === currentIndex ? 'opacity-100' : 'opacity-0 absolute inset-0'
                  } flex items-center justify-center`}
                >
                  {/* Background with parallax effect */}
                  <div
                    className="absolute inset-0 scale-110"
                    style={{
                      backgroundImage: media?.url ? `url(${media.url})` : 'none',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      filter: 'blur(15px) brightness(0.8)',
                      transform: 'translateZ(-1px) scale(1.2)',
                      zIndex: 0,
                    }}
                  />

                  {/* Main image with brand-blue overlay */}
                  <div className="flex items-center justify-center relative z-10">
                    <div className="relative">
                      <Media
                        imgClassName={cn(
                          'md:h-[60vh] h-[30vh] object-cover drop-shadow-2xl brightness-90',
                          imgClassName,
                        )}
                        resource={media}
                      />
                      {/* Semi-transparent brand-blue overlay like in HighImpact hero */}
                      <div className="absolute inset-0 bg-brand-blue/20 z-10" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Slider indicators */}
            {/*<div className="absolute z-30 flex -translate-x-1/2 bottom-4 left-1/2 space-x-3 rtl:space-x-reverse">
            {mediaItems.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`w-3 h-3 rounded-full ${
                  index === currentIndex ? 'bg-gray-400' : 'bg-gray-300'
                }`}
                aria-current={index === currentIndex ? 'true' : 'false'}
                aria-label={`Image ${index + 1}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>*/}

            {/* Slider controls */}
            {mediaItems.length > 1 && (
              <>
                <button
                  type="button"
                  className="absolute top-1/2 -translate-y-1/2 left-2 z-30 flex items-center justify-center w-10 h-10 rounded-full bg-white/70 hover:bg-white focus:outline-none shadow-md"
                  onClick={goToPrevSlide}
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span className="sr-only">Previous</span>
                </button>
                <button
                  type="button"
                  className="absolute top-1/2 -translate-y-1/2 right-2 z-30 flex items-center justify-center w-10 h-10 rounded-full bg-white/70 hover:bg-white focus:outline-none shadow-md"
                  onClick={goToNextSlide}
                >
                  <ChevronRight className="w-5 h-5" />
                  <span className="sr-only">Next</span>
                </button>
              </>
            )}
          </div>
        )}

        {/* Title Bar */}
        <div className="bg-brand-blue p-4">
          {title && <h3 className="text-3xl text-brand-white font-bold text-center">{title}</h3>}
        </div>

        {/* Details/Summary for expandable content */}
        <details
          className="group"
          open={isExpanded}
          onToggle={(e) => setIsExpanded(e.currentTarget.open)}
        >
          <summary className="flex items-center justify-between bg-white md:px-20 px-2 md:my-5 my-2 h-[10vh] content-center cursor-pointer list-none gap-5 md:flex-row flex-col-reverse">
            <div className="flex items-center md:gap-4 gap-1">
              {/* Expand Button with Plus Icon */}
              <Button
                variant="orange"
                size="icon"
                className="transition-transform duration-300 pointer-events-none my-auto md:h-10 md:w-10 h-8 w-8 rounded-[50%]"
              >
                <Plus
                  className={`transform transition-transform group-open:rotate-45 rotate-0 text-brand-white md:h-6 md:w-6 h-4 w-4`}
                />
                <span className="sr-only">{isExpanded ? 'Collapse' : 'Expand'}</span>
              </Button>
              <span className="text-brand-blue font-semibold text-sm md:text-xl">SZCZEGÓŁY</span>
            </div>

            {/* Action Button */}
            {enableButton && buttonText && (
              <Button variant="orange" className="md:py-7 pointer-events-none">
                <RichText
                  data={buttonText}
                  className="font-semibold text-sm md:text-xl text-brand-white"
                />
              </Button>
            )}
          </summary>

          {/* Expandable Content */}
          <div className="bg-white md:px-20 px-2 mb-5 overflow-auto">
            {inside?.content && (
              <RichText
                className="text-sm md:text-base gap-y-2 flex flex-col text-brand-blue"
                data={inside?.content}
                enableGutter={false}
                enableProse={false} /* Disabled prose to remove default styling */
              />
            )}
          </div>
        </details>
      </div>
    </div>
  )
}
