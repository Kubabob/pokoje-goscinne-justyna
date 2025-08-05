'use client'
import { Roboto_Serif } from 'next/font/google'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'

const robotoSerif = Roboto_Serif({ subsets: ['latin'] })

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  const scrollToNextSection = () => {
    // Find the hero element and get the next sibling element
    const heroElement = document.querySelector('.hero-section')
    const nextSection = heroElement?.nextElementSibling

    // Scroll to the next section if it exists
    if (nextSection) {
      window.scrollBy({
        top: window.innerHeight, // 100vh
        left: 0,
        behavior: 'smooth',
      })
    }
  }

  return (
    <>
      <div className="relative h-screen w-full flex items-center mt-[-128px] pt-[100px] hero-section">
        {/* Background media - position to cover entire viewport including under header */}
        <div className="absolute inset-0 -z-10">
          {media && typeof media === 'object' && (
            <>
              <Media fill imgClassName="object-cover brightness-50" priority resource={media} />
              <div className="absolute inset-0 bg-brand-blue/30" />
            </>
          )}
        </div>

        {/* Content container */}
        <div className="container flex flex-col mx-auto px-4 md:px-6 relative z-10 gap-20">
          {/* Text container - left aligned */}
          <div className="max-w-xl text-left">
            {richText && (
              <RichText
                className={cn('text-brand-white mb-8', robotoSerif.className)}
                data={richText}
                enableGutter={false}
              />
            )}
          </div>

          {/* Links container - centered */}
          {Array.isArray(links) && links.length > 0 && (
            <div className="w-full flex justify-center mt-8">
              <ul className="flex flex-col items-center gap-4 md:flex-row">
                {links.map(({ link }, i) => {
                  return (
                    <li key={i}>
                      <CMSLink {...link} className="text-brand-white" />
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
        </div>

        {/* Glowing arrow scroll indicator with opacity animation */}
        <div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer z-20"
          onClick={scrollToNextSection}
        >
          <div className="flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              viewBox="0 0 24 24"
              className="arrow-animation"
              fill="white"
            >
              <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8z" />
              <path d="M12 12.586 8.707 9.293l-1.414 1.414L12 15.414l4.707-4.707-1.414-1.414L12 12.586z" />
            </svg>
          </div>
        </div>
      </div>
    </>
  )
}
