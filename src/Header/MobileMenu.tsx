'use client'

import React, { useEffect, useRef } from 'react'
import { CMSLink } from '@/components/Link'
import type { Header as HeaderType } from '@/payload-types'
import { cn } from '@/utilities/ui'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  data: HeaderType
}

// Custom animated underline style - same as footer but with slight adjustments for mobile
const animatedLinkClass =
  'relative after:absolute after:bg-brand-white after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:transition-all after:duration-300 hover:after:w-full'

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, data }) => {
  const navItems = data?.navItems || []
  const menuRef = useRef<HTMLDivElement>(null)

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) && isOpen) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          'fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity z-40',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none',
        )}
        onClick={onClose}
      />

      {/* Menu panel */}
      <div
        ref={menuRef}
        className={cn(
          'fixed top-0 right-0 h-full w-[80%] max-w-[350px] bg-brand-blue z-50 shadow-xl transform transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex flex-col h-full p-8 pt-24">
          <nav className="flex flex-col space-y-6">
            {navItems.map(({ link }, i) => (
              <CMSLink
                key={i}
                {...link}
                appearance="inline"
                className={`text-brand-white text-xl font-medium pb-2 ${animatedLinkClass}`}
                onClick={onClose}
              />
            ))}
          </nav>

          {/*<div className="mt-auto pt-8 text-brand-white/70 text-sm">
            <p>© {new Date().getFullYear()} Pokoje Gościnne Justyna</p>
          </div>*/}
          <div className="mt-auto pt-8 text-brand-white/70 text-sm text-center">
            <p>© {new Date().getFullYear()} Pokoje Gościnne Justyna</p>
            <p className="mt-2">
              made with ❤️ by{' '}
              <a
                href="https://github.com/Kubabob"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-white hover:text-brand-white/80 transition-colors"
              >
                Kuba Bożek
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
