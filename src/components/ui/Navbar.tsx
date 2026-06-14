'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const NAV_ITEMS = [
  { label: 'Home', href: '#hero' },
  { label: 'Products', href: '#products', hasDropdown: true },
  { label: 'Custom Printing', href: '#custom', hasDropdown: true },
  { label: 'Bulk Orders', href: '#bulk' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
]

const PRODUCTS_DROPDOWN = [
  { label: 'Oversized Tees', href: '#oversized-tees', description: 'Premium heavyweight cotton, relaxed fit' },
  { label: "Kids' Collection", href: '#kids', description: 'Soft, safe, and stylish for little ones' },
  { label: 'Festival Specials', href: '#festival', description: 'Limited edition drops for celebrations' },
  { label: 'New Arrivals', href: '#new-arrivals', description: 'Fresh drops every week' },
]

const CUSTOM_PRINTING_DROPDOWN = [
  { label: 'Single Order', href: '#single', description: 'One-off custom designs, no minimums' },
  { label: 'Bulk Printing', href: '#bulk-print', description: 'Volume discounts from 10+ units' },
  { label: 'Corporate Orders', href: '#corporate', description: 'Branded merch for teams & events' },
  { label: 'Event Merchandise', href: '#events', description: 'Concerts, festivals, conferences' },
]

interface DropdownProps {
  items: Array<{ label: string; href: string; description: string }>
  triggerRef: React.RefObject<HTMLButtonElement | null>
  isOpen: boolean
  onClose: () => void
  position: { x: number; width: number }
}

function Dropdown({ items, triggerRef, isOpen, onClose, position }: DropdownProps) {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10, scaleY: 0.95 }}
        animate={{ opacity: 1, y: 0, scaleY: 1 }}
        exit={{ opacity: 0, y: -10, scaleY: 0.95 }}
        transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed top-[88px] z-50 glass-strong rounded-2xl overflow-hidden shadow-2xl border border-border-strong min-w-[240px]"
        style={{
          left: position.x,
          width: position.width,
        }}
        role="menu"
        aria-orientation="vertical"
      >
        <div className="p-2" role="none">
          {items.map((item, index) => (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ delay: index * 0.04, duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={onClose}
              className="w-full px-4 py-3 rounded-xl text-left transition-colors hover:bg-accent-light focus-visible:outline-none focus-visible:bg-accent-light focus-visible:ring-2 focus-visible:ring-accent"
              role="menuitem"
              tabIndex={-1}
            >
              <div className="font-medium text-text-primary">{item.label}</div>
              <div className="text-xs text-text-muted mt-0.5">{item.description}</div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<'products' | 'custom' | null>(null)
  const [dropdownPosition, setDropdownPosition] = useState({ x: 0, width: 0 })
  const [isMounted, setIsMounted] = useState(false)

  const productsRef = useRef<HTMLButtonElement>(null)
  const customRef = useRef<HTMLButtonElement>(null)
  const navbarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleDropdownOpen = (type: 'products' | 'custom', ref: React.RefObject<HTMLButtonElement | null>) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      setDropdownPosition({ x: rect.left, width: rect.width })
    }
    setOpenDropdown(type)
  }

  const handleDropdownClose = () => {
    setOpenDropdown(null)
  }

  const handleMouseLeave = () => {
    // Small delay to allow moving into dropdown
    setTimeout(() => {
      if (openDropdown) handleDropdownClose()
    }, 100)
  }

  if (!isMounted) {
    return (
      <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 opacity-0 pointer-events-none" aria-hidden="true">
        <div className="glass-strong rounded-2xl px-6 py-3 shadow-2xl border border-border-strong" />
      </div>
    )
  }

  return (
    <motion.div
      ref={navbarRef}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn(
        'fixed top-5 left-1/2 -translate-x-1/2 z-50',
        'glass-strong rounded-2xl shadow-2xl border border-border-strong',
        'transition-all duration-300 ease-out',
        isScrolled ? 'py-2.5 backdrop-blur-2xl' : 'py-3'
      )}
      style={{
        background: isScrolled 
          ? 'rgba(250, 250, 245, 0.85)' 
          : 'rgba(250, 250, 245, 0.75)',
        backdropFilter: isScrolled ? 'blur(20px)' : 'blur(16px)',
      }}
      onMouseLeave={handleMouseLeave}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex items-center gap-1">
        {/* Logo */}
        <Link
          href="#hero"
          className="flex items-center gap-2 px-4 py-2 font-bold text-lg text-text-primary hover:opacity-80 transition-opacity"
          aria-label="Fashtrend - Home"
        >
          <span className="text-accent">F</span>ashtrend
        </Link>

        {/* Divider */}
        <div className="hidden md:block w-px h-6 bg-border mx-1" aria-hidden="true" />

        {/* Nav Items */}
        <nav className="flex items-center gap-0.5" role="menubar">
          {NAV_ITEMS.map((item) => {
            if (item.hasDropdown) {
              const isProducts = item.label === 'Products'
              const isCustom = item.label === 'Custom Printing'
              const isOpen = openDropdown === (isProducts ? 'products' : 'custom')
              const triggerRef = isProducts ? productsRef : customRef

              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => handleDropdownOpen(isProducts ? 'products' : 'custom', triggerRef)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    ref={triggerRef}
                    type="button"
                    className={cn(
                      'px-4 py-2.5 text-sm font-medium text-text-secondary',
                      'rounded-xl transition-colors',
                      'hover:text-text-primary hover:bg-accent-light/50',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                      isOpen && 'text-text-primary bg-accent-light/50'
                    )}
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                    aria-controls={`${item.label.toLowerCase()}-dropdown`}
                    role="menuitem"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
                        e.preventDefault()
                        handleDropdownOpen(isProducts ? 'products' : 'custom', triggerRef)
                      } else if (e.key === 'Escape') {
                        handleDropdownClose()
                      }
                    }}
                  >
                    <span className="flex items-center gap-1.5">
                      {item.label}
                      <svg
                        className={cn('w-4 h-4 transition-transform', isOpen && 'rotate-180')}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>

                  <Dropdown
                    items={isProducts ? PRODUCTS_DROPDOWN : CUSTOM_PRINTING_DROPDOWN}
                    triggerRef={triggerRef}
                    isOpen={isOpen}
                    onClose={handleDropdownClose}
                    position={dropdownPosition}
                  />
                </div>
              )
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                className="px-4 py-2.5 text-sm font-medium text-text-secondary rounded-xl transition-colors hover:text-text-primary hover:bg-accent-light/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                role="menuitem"
                onClick={handleDropdownClose}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Divider */}
        <div className="hidden md:block w-px h-6 bg-border mx-1" aria-hidden="true" />

        {/* CTA Button */}
        <Button
          variant="primary"
          size="sm"
          asChild
        >
          <Link href="#configurator" onClick={handleDropdownClose}>
            Start Designing
          </Link>
        </Button>
      </div>
    </motion.div>
  )
}