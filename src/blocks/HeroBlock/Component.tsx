'use client'
import { Roboto_Serif } from 'next/font/google'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'
import type { HeroBlock as HeroBlockProps } from '@/payload-types'

import { RichText } from '@payloadcms/richtext-lexical/react'
import { cn } from '@/utilities/ui'

const robotoSerif = Roboto_Serif({ subsets: ['latin'] })

export const HeroBlock: React.FC<HeroBlockProps> = (props) => {
  const { richText } = props
  return (
    <div
      className="relative -mt-[10.4rem] flex items-center justify-center text-brand-blue w-screen h-screen flex-col"
      data-theme="dark"
    >
      <div className="container mb-8 mt-24 z-10 relative flex items-center pl-4">
        <div className="max-w-[36.5rem]">
          {richText && (
            <RichText
              className={cn('mb-6', robotoSerif.className, 'text-brand-blue')}
              data={richText}
              // enableGutter={false}
            />
          )}
        </div>
      </div>
    </div>
  )
}
