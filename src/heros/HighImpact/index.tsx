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
    <div
      className="relative flex items-center justify-center text-white w-screen h-screen flex-col pt-4 md:pt-8"
      data-theme="dark"
    >
      <div className="container mb-4 md:mb-8 mt-12 md:mt-24 z-10 relative flex items-center pl-2 md:pl-4">
        <div>
          {richText && (
            <RichText
              className={cn('mb-6', robotoSerif.className, 'text-white')}
              data={richText}
              enableGutter={false}
            />
          )}
        </div>
      </div>
      <div className="container mb-20 mt-16 z-10 relative flex items-center pl-4">
        <div className="w-screen">
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex justify-center gap-4 flex-col">
              {links.map(({ link }, i) => {
                return (
                  <li key={i} className="self-center">
                    <CMSLink {...link} />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
      <div className="select-none">
        {media && typeof media === 'object' && (
          <>
            <div className="absolute inset-0 bg-brand-blue/50 -z-10" />
            <Media fill imgClassName="-z-20 object-cover" priority resource={media} />
          </>
        )}
      </div>
    </div>
  )
}
