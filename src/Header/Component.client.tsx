'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { cn } from '@/utilities/ui'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { MobileMenu } from './MobileMenu'
import { Menu, X } from 'lucide-react'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Set header theme based on path and close mobile menu
  useEffect(() => {
    setMobileMenuOpen(false)
    if (pathname === '/') {
      setHeaderTheme('dark')
    } else {
      setHeaderTheme('light')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [mobileMenuOpen])

  return (
    <header
      className={cn(
        'py-4 md:py-6 relative z-50',
        theme === 'dark' ? 'text-brand-white' : 'text-brand-black',
      )}
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <Link href="/" className="flex-shrink-0 relative z-10">
          <Logo theme={theme} loading="eager" priority="high" className="" />
        </Link>

        {/* Desktop Navigation - Hidden on mobile */}
        <div className="hidden md:block">
          <HeaderNav data={data} theme={theme} />
        </div>

        {/* Mobile Menu Button - Only visible on mobile */}
        <button
          className={cn(
            'md:hidden relative z-10 p-2',
            theme === 'dark' ? 'text-brand-white' : 'text-brand-black',
          )}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Menu Panel */}
        <MobileMenu
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          data={data}
          theme={theme}
        />
      </div>
    </header>
  )
}
