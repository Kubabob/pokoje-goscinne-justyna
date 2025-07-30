'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

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

  // Close mobile menu when navigating to a new page
  useEffect(() => {
    setMobileMenuOpen(false)
    setHeaderTheme(null)
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
    <header className="py-4 md:py-6 relative z-50" {...(theme ? { 'data-theme': theme } : {})}>
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <Link href="/" className="flex-shrink-0 relative z-10">
          <Logo loading="eager" priority="high" className="" />
        </Link>

        {/* Desktop Navigation - Hidden on mobile */}
        <div className="hidden md:block">
          <HeaderNav data={data} />
        </div>

        {/* Mobile Menu Button - Only visible on mobile */}
        <button
          className="md:hidden relative z-10 text-brand-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Menu Panel */}
        <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} data={data} />
      </div>
    </header>
  )
}
