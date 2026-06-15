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
  const [isHovering, setIsHovering] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const cardsContainerRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null)
  const gsapContextRef = useRef<gsap.Context | null>(null)
  const animationFrameRef = useRef<number>(null)
  const scrollPositionRef = useRef(0)
  const directionRef = useRef(1) // 1 for forward, -1 for reverse

  const currentProducts = CAROUSEL_PRODUCTS[activeTab] || []

  // Create infinite loop data (duplicate products)
  const infiniteProducts = [...currentProducts, ...currentProducts, ...currentProducts]

  // Handle tab change with smooth fade
  const handleTabChange = useCallback((tabId: CarouselTabId) => {
    if (tabId === activeTab || isAnimating) return
    
    setIsAnimating(true)
    
    // Fade out
    gsap.to(cardsContainerRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        setActiveTab(tabId)
        // Fade in
        gsap.fromTo(cardsContainerRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', onComplete: () => setIsAnimating(false) }
        )
      }
    })
  }, [activeTab, isAnimating])

  // Auto-scroll animation
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    let lastTime = performance.now()
    const baseSpeed = 0.35 // pixels per ms - very slow, cinematic

    const animate = (currentTime: number) => {
      if (!isHovering && container) {
        const deltaTime = currentTime - lastTime
        const scrollDistance = baseSpeed * deltaTime * directionRef.current
        
        scrollPositionRef.current += scrollDistance
        
        // Handle infinite loop - when we've scrolled one full set, reset seamlessly
        const singleSetWidth = container.scrollWidth / 3
        if (scrollPositionRef.current >= singleSetWidth) {
          scrollPositionRef.current -= singleSetWidth
        } else if (scrollPositionRef.current <= 0) {
          scrollPositionRef.current += singleSetWidth
        }
        
        container.scrollLeft = scrollPositionRef.current
      }
      lastTime = currentTime
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    // Start from middle of the triplicated content for seamless looping
    const initScroll = () => {
      const singleSetWidth = container.scrollWidth / 3
      scrollPositionRef.current = singleSetWidth
      container.scrollLeft = scrollPositionRef.current
    }

    // Wait for layout
    setTimeout(initScroll, 100)
    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isHovering, activeTab, infiniteProducts.length])

  // Scroll animation setup (entrance)
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!carouselRef.current) return

      // Stagger entrance animation for carousel section
      const cards = cardsContainerRef.current?.querySelectorAll('[data-card-id]')
      if (cards && cards.length > 0) {
        gsap.fromTo(cards,
          { opacity: 0, y: 25, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.05,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: carouselRef.current,
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
      scrollTriggerRef.current?.kill()
    }
  }, [activeTab])

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!scrollContainerRef.current) return
    
    const container = scrollContainerRef.current
    const scrollAmount = 360
    
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
      className="py-24 lg:py-32 px-6"
      aria-labelledby="carousel-heading"
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <h2 id="carousel-heading" className="text-4xl lg:text-5xl font-extrabold text-text-primary mb-5">
            Shop <span className="text-accent">Collection</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Discover our curated selection of premium oversized tees, custom designs, kids' fits, and festival specials. Each piece crafted with attention to detail in Pune.
          </p>
        </div>

        {/* Tabs */}
        <CarouselTabs
          activeTab={activeTab}
          onTabChange={handleTabChange}
          className="mb-12 lg:mb-16 justify-center"
        />

        {/* Carousel Container */}
        <div className="relative">
          {/* Horizontal Scroll Container - Infinite Rail */}
          <div
            ref={scrollContainerRef}
            className="flex gap-8 lg:gap-10 pb-8 dock-hover-container"
            role="region"
            aria-label="Product carousel"
            tabIndex={0}
            style={{
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
              cursor: isHovering ? 'grab' : 'default',
            }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onTouchStart={() => setIsHovering(true)}
            onTouchEnd={() => setIsHovering(false)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                ref={cardsContainerRef}
                className="flex gap-8 lg:gap-10 min-w-max"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                role="tabpanel"
                id={`${activeTab}-panel`}
                aria-labelledby={`${activeTab}-trigger`}
              >
                {infiniteProducts.map((product, index) => (
                  <div key={`${product.id}-${Math.floor(index / currentProducts.length)}`} className="flex-shrink-0 snap-start" style={{ width: '320px' }}>
                    <ProductCard product={product} index={index % currentProducts.length} />
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Gradient Fade Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" aria-hidden="true" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" aria-hidden="true" />
        </div>

        {/* View All CTA */}
        <div className="text-center mt-16">
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