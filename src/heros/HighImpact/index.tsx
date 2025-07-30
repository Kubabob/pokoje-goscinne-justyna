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

  return (
    <div className="relative h-screen w-full flex items-center mt-[-128px] pt-[100px]">
      {/* Background media - position to cover entire viewport including under header */}
      <div className="absolute inset-0 -z-10">
        {media && typeof media === 'object' && (
          <>
            <Media fill imgClassName="object-cover brightness-50" priority resource={media} />
            <div className="absolute inset-0 bg-black/30" />
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
    </div>
  )
}
