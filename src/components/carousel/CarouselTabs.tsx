'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { CAROUSEL_TABS, type CarouselTabId } from '@/lib/constants'

interface CarouselTabsProps {
  activeTab: CarouselTabId
  onTabChange: (tabId: CarouselTabId) => void
  className?: string
}

export function CarouselTabs({ activeTab, onTabChange, className }: CarouselTabsProps) {
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0, opacity: 0 })
  const tabsRef = useRef<HTMLDivElement>(null)
  const activeTabRef = useRef<HTMLButtonElement | null>(null)

  // Update indicator position
  useEffect(() => {
    if (tabsRef.current && activeTabRef.current) {
      const containerRect = tabsRef.current.getBoundingClientRect()
      const activeRect = activeTabRef.current.getBoundingClientRect()
      
      setIndicatorStyle({
        width: activeRect.width,
        left: activeRect.left - containerRect.left,
        opacity: 1,
      })
    }
  }, [activeTab])

  // Set active tab ref
  useEffect(() => {
    if (tabsRef.current) {
      const activeButton = tabsRef.current.querySelector(`[data-tab="${activeTab}"]`) as HTMLButtonElement
      if (activeButton) {
        activeTabRef.current = activeButton
      }
    }
  }, [activeTab])

  return (
    <div className={cn('relative', className)}>
      {/* Scrollable tabs container */}
      <div
        ref={tabsRef}
        className="flex items-center gap-1 px-1 pb-2 overflow-x-auto scrollbar-hide"
        role="tablist"
        aria-label="Product categories"
      >
        {/* Active indicator */}
        <motion.div
          className="absolute bottom-0 h-1 rounded-full pointer-events-none"
          style={{
            background: 'var(--color-accent)',
            boxShadow: '0 0 12px var(--color-accent)',
          }}
          animate={indicatorStyle}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        />

        {CAROUSEL_TABS.map((tab) => (
          <motion.button
            key={tab.id}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: CAROUSEL_TABS.indexOf(tab) * 0.05, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            data-tab={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              'relative z-10 px-5 py-2.5 text-sm font-medium rounded-xl',
              'transition-all duration-200 ease-out',
              'whitespace-nowrap',
              activeTab === tab.id
                ? 'text-text-primary bg-accent-light'
                : 'text-text-secondary hover:text-text-primary hover:bg-accent-light/30',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent'
            )}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`${tab.id}-panel`}
            id={`${tab.id}-trigger`}
          >
            <span className="flex items-center gap-1.5">
              <span aria-hidden="true">{tab.emoji}</span>
              {tab.label}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}