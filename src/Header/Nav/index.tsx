'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'

// Custom animated underline style - same as footer
const animatedLinkClass =
  'relative after:absolute after:bg-brand-white after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:transition-all after:duration-300 hover:after:w-full'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []

  return (
    <nav className="flex items-center space-x-6">
      {navItems.map(({ link }, i) => {
        return (
          <CMSLink
            key={i}
            {...link}
            appearance="inline"
            className={`text-brand-white text-lg pb-1 ${animatedLinkClass}`}
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
