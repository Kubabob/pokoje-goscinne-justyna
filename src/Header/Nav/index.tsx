'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'

interface HeaderNavProps {
  data: HeaderType
  theme?: string | null
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ data, theme }) => {
  const navItems = data?.navItems || []

  const animatedLinkClass = `relative after:absolute ${
    theme === 'dark' ? 'after:bg-brand-white' : 'after:bg-brand-blue'
  } after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:transition-all after:duration-300 hover:after:w-full`

  return (
    <nav className="flex items-center space-x-6">
      {navItems.map(({ link }, i) => {
        return (
          <CMSLink
            key={i}
            {...link}
            appearance="inline"
            className={cn(
              'text-lg pb-1',
              theme === 'dark' ? 'text-brand-white' : 'text-brand-blue',
              // animatedLinkClass,
              'animatedUnderline',
            )}
          />
        )
      })}
      {/* <Link href="/search">
        <span className="sr-only">Search</span>
        <SearchIcon className="w-5 text-primary" />
      </Link> */}
    </nav>
  )
}
