'use client'
import type { StaticImageData } from 'next/image'
import { cn } from '@/utilities/ui'
import React, { useState, useEffect, useRef } from 'react'
import RichText from '@/components/RichText'
import type { ExpandableBlock as ExpandableBlockProps } from '@/payload-types'
import { Button } from '@/components/ui/button'
import { Media } from '@/components/Media'
import { ChevronLeft, ChevronRight } from 'lucide-react'

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
  } = props

  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Auto-advance the carousel every 10 seconds
  useEffect(() => {
    if (!mediaItems || mediaItems.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % mediaItems.length)
    }, 10000)

    return () => clearInterval(interval)
  }, [mediaItems])

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
    <>
      {title && <h3 className="bg-blue-500">{title}</h3>}

      {mediaItems && mediaItems.length > 0 && (
        <div className="relative mb-6">
          <div
            className="relative overflow-hidden rounded-lg"
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
                }`}
              >
                <Media imgClassName={cn('w-100 h-auto', imgClassName)} resource={media} />
              </div>
            ))}
          </div>

          {/* Slider indicators */}
          <div className="absolute z-30 flex -translate-x-1/2 bottom-4 left-1/2 space-x-3 rtl:space-x-reverse">
            {mediaItems.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`w-3 h-3 rounded-full ${
                  index === currentIndex ? 'bg-primary' : 'bg-gray-300'
                }`}
                aria-current={index === currentIndex ? 'true' : 'false'}
                aria-label={`Image ${index + 1}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>

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

      <div>
        <details>
          <summary>Szczegóły</summary>
          {inside?.content && <RichText data={inside?.content} />}
        </details>
        {enableButton && buttonText && (
          <Button variant={'orange'}>
            <RichText data={buttonText} />
          </Button>
        )}
      </div>
    </>
  )
}
