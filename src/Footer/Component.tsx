import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer as FooterType } from '@/payload-types'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import RichText from '@/components/RichText'

// Custom animated underline style
const animatedLinkClass =
  'relative after:absolute after:bg-brand-white after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:transition-all after:duration-300 hover:after:w-full'

export async function Footer() {
  const footerData: FooterType = await getCachedGlobal('footer', 2)()
  const navItems = footerData?.navigation?.navItems || []
  const infoContent = footerData?.info?.richText

  // Create column structure with max 4 items per column
  const navColumns = []
  for (let i = 0; i < navItems.length; i += 4) {
    navColumns.push(navItems.slice(i, i + 4))
  }

  return (
    <footer className="bg-brand-blue py-6 md:py-8 mt-auto">
      <div className="container mx-auto px-4 md:px-6">
        {/* Mobile layout: Logo hidden, info left, nav right */}
        <div className="flex flex-row justify-between items-start md:hidden">
          {/* Info content - Left on mobile */}
          <div className="max-w-[60%] pt-1">
            {' '}
            {/* Added pt-1 to align with navigation */}
            {infoContent && (
              <RichText
                className="text-brand-white text-xs [&>p]:m-0" /* Removed default margins */
                data={infoContent}
                enableGutter={false}
                enableProse={false} /* Disabled prose to remove default styling */
              />
            )}
          </div>

          {/* Navigation - Right on mobile, compact style */}
          <div className="flex flex-col items-end space-y-2 pt-1">
            {' '}
            {/* Added pt-1 for consistent spacing */}
            {navItems.map(({ link }: { link: any }, i: number) => (
              <CMSLink
                className={`text-brand-white text-xs pb-0.5 ${animatedLinkClass}`}
                key={i}
                {...link}
              />
            ))}
          </div>
        </div>

        {/* Desktop layout: Logo visible, full layout */}
        <div className="hidden md:flex md:flex-row md:justify-between md:items-center">
          {/* Logo - Only visible on md screens and up */}
          <div className="flex items-center">
            <Link href="/" className="inline-block">
              <Logo />
            </Link>
          </div>

          {/* Info content */}
          {infoContent && (
            <div className="text-left max-w-md flex items-center">
              <RichText
                className="text-brand-white text-sm [&>p]:m-0" /* Removed default margins */
                data={infoContent}
                enableGutter={false}
                enableProse={false} /* Disabled prose to remove default styling */
              />
            </div>
          )}

          {/* Navigation - Columnar layout with animated underline */}
          <div className="flex flex-row space-x-8">
            {navColumns.map((column, colIndex) => (
              <nav key={`col-${colIndex}`} className="flex flex-col items-end space-y-3">
                {column.map(({ link }: { link: any }, i: number) => (
                  <CMSLink
                    className={`text-brand-white text-base pb-1 ${animatedLinkClass}`}
                    key={i}
                    {...link}
                  />
                ))}
              </nav>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
