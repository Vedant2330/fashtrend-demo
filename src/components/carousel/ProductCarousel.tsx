'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/lib/utils'
import { ProductCard } from './ProductCard'
import { CarouselTabs } from './CarouselTabs'
import { CAROUSEL_PRODUCTS, CAROUSEL_TABS, type CarouselProduct, type CarouselTabId } from '@/lib/constants'

gsap.registerPlugin(ScrollTrigger)

export function ProductCarousel() {
  const [activeTab, setActiveTab] = useState<CarouselTabId>(CAROUSEL_TABS[0].id)
  const [isAnimating, setIsAnimating] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const cardsContainerRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null)
  const gsapContextRef = useRef<gsap.Context | null>(null)

  const currentProducts = CAROUSEL_PRODUCTS[activeTab] || []

  // Handle tab change with cube rotation animation
  const handleTabChange = useCallback((tabId: CarouselTabId) => {
    if (tabId === activeTab || isAnimating) return
    
    setIsAnimating(true)
    
    // Animate out current cards
    const currentCards = cardsContainerRef.current?.querySelectorAll('[data-card-id]')
    if (currentCards) {
      gsap.to(currentCards, {
        opacity: 0,
        y: 30,
        scale: 0.9,
        rotationY: 45,
        duration: 0.4,
        stagger: 0.03,
        ease: 'power2.in',
        onComplete: () => {
          setActiveTab(tabId)
          // Animate in new cards
          setTimeout(() => {
            const newCards = cardsContainerRef.current?.querySelectorAll('[data-card-id]')
            if (newCards) {
              gsap.fromTo(newCards,
                { opacity: 0, y: 30, scale: 0.9, rotationY: -45 },
                { opacity: 1, y: 0, scale: 1, rotationY: 0, duration: 0.5, stagger: 0.05, ease: 'power2.out', onComplete: () => setIsAnimating(false) }
              )
            }
          }, 50)
        }
      })
    } else {
      setActiveTab(tabId)
      setIsAnimating(false)
    }
  }, [activeTab, isAnimating])

  // Scroll animation setup
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!carouselRef.current) return

      // Stagger entrance animation for carousel section
      const cards = cardsContainerRef.current?.querySelectorAll('[data-card-id]')
      if (cards && cards.length > 0) {
        gsap.fromTo(cards,
          { opacity: 0, y: 40, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: carouselRef.current,
              start: 'top 80%',
              end: 'top 40%',
              toggleActions: 'play none none reverse',
            }
          }
        )
      }

      // Horizontal scroll progress animation
      if (scrollContainerRef.current) {
        scrollTriggerRef.current = ScrollTrigger.create({
          trigger: carouselRef.current,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: (self) => {
            // Could add parallax or other scroll effects here
          }
        })
      }
    })

    gsapContextRef.current = ctx

    return () => {
      ctx.revert()
      scrollTriggerRef.current?.kill()
    }
  }, [])

  // Keyboard navigation for horizontal scroll
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!scrollContainerRef.current) return
    
    const container = scrollContainerRef.current
    const scrollAmount = 360 // Approximate card width + gap
    
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <section
      ref={carouselRef}
      id="products"
      className="py-20 lg:py-28 px-6"
      aria-labelledby="carousel-heading"
      onKeyDown={handleKeyDown}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 id="carousel-heading" className="text-4xl lg:text-5xl font-extrabold text-text-primary mb-4">
            Shop <span className="text-accent">Collection</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Discover our curated selection of premium oversized tees, custom designs, kids' fits, and festival specials. Each piece crafted with attention to detail in Pune.
          </p>
        </div>

        {/* Tabs */}
        <CarouselTabs
          activeTab={activeTab}
          onTabChange={handleTabChange}
          className="mb-8 justify-center"
        />

        {/* Carousel Container */}
        <div className="relative">
          {/* Scroll Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" aria-hidden="true" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" aria-hidden="true" />

          {/* Horizontal Scroll Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 lg:gap-8 pb-6 overflow-x-auto scrollbar-hide scroll-smooth"
            role="region"
            aria-label="Product carousel"
            tabIndex={0}
            style={{
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                ref={cardsContainerRef}
                className="flex gap-6 lg:gap-8 min-w-max"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                role="tabpanel"
                id={`${activeTab}-panel`}
                aria-labelledby={`${activeTab}-trigger`}
              >
                {currentProducts.map((product, index) => (
                  <div key={product.id} className="flex-shrink-0 snap-start" style={{ width: '340px' }}>
                    <ProductCard product={product} index={index} />
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-2 text-text-muted text-xs opacity-60 hidden lg:flex">
            <motion.svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ x: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </motion.svg>
            <span>Scroll to explore</span>
          </div>
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <a
            href="#gallery"
            className="inline-flex items-center gap-2 text-accent font-medium hover:text-accent-hover transition-colors"
          >
            View All Products
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}