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
    <div className="">
      <div className="">
        <div className="">
          {richText && (
            <RichText
              className={cn('', robotoSerif.className)}
              data={richText}
              enableGutter={false}
            />
          )}
        </div>
        {Array.isArray(links) && links.length > 0 && (
          <ul className="">
            {links.map(({ link }, i) => {
              return (
                <li key={i}>
                  <CMSLink {...link} />
                </li>
              )
            })}
          </ul>
        )}
      </div>
      <div className="">
        {media && typeof media === 'object' && (
          <>
            <Media fill imgClassName="-z-10 " priority resource={media} />
            <div className="" />
          </>
        )}
      </div>
    </div>
  )
}
