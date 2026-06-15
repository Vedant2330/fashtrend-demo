'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/lib/utils'
import { UGCItem } from './UGCItem'
import { UGC_ITEMS, type UGCItem as UGCItemType } from '@/lib/constants'
import { Button } from '@/components/ui/Button'

gsap.registerPlugin(ScrollTrigger)

// Share icon component
function ShareIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
    </svg>
  )
}

// Instagram icon component
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <path d="M17.5 6.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5z" />
    </svg>
  )
}

// Close icon component
function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

interface UGCWallProps {
  className?: string
}

export function UGCWall({ className }: UGCWallProps) {
  const wallRef = useRef<HTMLDivElement>(null)
  const gsapContextRef = useRef<gsap.Context | null>(null)
  const [selectedItem, setSelectedItem] = useState<UGCItemType | null>(null)

  // Scroll animations setup
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!wallRef.current) return

      // Stagger fade-up + scale animation for masonry items - reduced intensity
      const items = wallRef.current.querySelectorAll('[data-ugc-item]')
      if (items.length > 0) {
        gsap.fromTo(items,
          { opacity: 0, scale: 0.97, y: 20 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.7,
            stagger: { amount: 0.8, from: 'start' },
            ease: 'power2.out',
            scrollTrigger: {
              trigger: wallRef.current,
              start: 'top 85%',
              end: 'top 45%',
              toggleActions: 'play none none reverse',
            }
          }
        )
      }
    })

    gsapContextRef.current = ctx

    return () => {
      ctx.revert()
    }
  }, [])

  const handleOpenModal = (item: UGCItemType) => {
    setSelectedItem(item)
  }

  const handleCloseModal = () => {
    setSelectedItem(null)
  }

  return (
    <>
      {/* UGC Wall Section */}
      <section
        ref={wallRef}
        id="gallery"
        className={cn('py-24 lg:py-36 px-6', className)}
        aria-labelledby="ugc-heading"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
            <h2 id="ugc-heading" className="text-4xl lg:text-5xl font-extrabold text-text-primary mb-5">
              Community <span className="text-accent">Showcase</span>
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
              Real customers, real stories. See how our community styles their Fashtrend tees.
            </p>
           
            {/* CTA Row */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="outline" size="md" onClick={() => window.open('https://instagram.com/fash__trend', '_blank')}>
                <InstagramIcon />
                Follow @fash__trend
              </Button>
              <span className="text-text-muted text-sm hidden sm:block">Tag us to be featured</span>
            </div>
          </div>

          {/* Masonry Grid */}
          <div
            className={cn(
              'grid gap-6 lg:gap-8',
              'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
            )}
            role="list"
            aria-label="Community posts"
          >
            {UGC_ITEMS.map((item, index) => (
              <div key={item.id} data-ugc-item={item.id}>
                <UGCItem item={item} index={index} onOpenModal={handleOpenModal} />
              </div>
            ))}
          </div>

          {/* View More CTA */}
          <div className="text-center mt-16 lg:mt-20">
            <a
              href="https://instagram.com/fash__trend"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-accent font-medium hover:text-accent-hover transition-colors"
            >
              View More on Instagram
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Modal for expanded view */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={handleCloseModal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative max-w-2xl w-full max-h-[90vh] overflow-hidden bg-background rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={handleCloseModal}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-background transition-colors"
                aria-label="Close modal"
              >
                <CloseIcon className="w-5 h-5 text-text-primary" />
              </motion.button>

              {/* Media */}
              <div className="relative aspect-video">
                {selectedItem.isVideo && selectedItem.videoUrl ? (
                  <video
                    src={selectedItem.videoUrl}
                    controls
                    autoPlay
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.caption}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Caption & Meta */}
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <span className="text-sm font-bold text-accent">{selectedItem.author.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-text-primary">{selectedItem.author}</p>
                    <p className="text-sm text-text-muted">{selectedItem.authorHandle}</p>
                  </div>
                </div>

                <p className="text-text-primary whitespace-pre-wrap">{selectedItem.caption}</p>

                <div className="flex flex-wrap gap-2">
                  {selectedItem.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 text-sm font-medium rounded-full bg-accent-light text-accent border border-border">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-6 pt-4 border-t border-border">
                  <Button variant="ghost" size="sm" icon={<ShareIcon />} iconPosition="left">
                    Share via WhatsApp
                  </Button>
                  <Button variant="ghost" size="sm" icon={<InstagramIcon />} iconPosition="left">
                    Follow @fash__trend
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}