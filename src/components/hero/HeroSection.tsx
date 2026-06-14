'use client'

import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface HeroSectionProps {
  className?: string
}

export function HeroSection({ className }: HeroSectionProps) {
  return (
    <section
      className={cn(
        'relative min-h-screen overflow-hidden',
        'rounded-b-[48px]',
        className
      )}
      aria-labelledby="hero-heading"
    >
      {/* Single Full-Width Video Background */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        >
          <source src="/videos/hero-desktop.webm" type="video/webm" />
          <source src="/videos/hero-mobile.webm" type="video/webm" />
        </video>

        {/* Subtle overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/30" />
      </div>

      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 z-50 h-[3px] w-full origin-left transform scale-x-0 bg-gradient-to-r from-accent to-accent-hover scroll-progress" id="scroll-progress" />

      {/* Content Wrapper - Absolutely Centered at 55% Viewport Height */}
      <div 
        className="relative z-10"
        style={{
          position: 'absolute',
          left: '50%',
          top: '55%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          maxWidth: '800px',
          padding: '0 24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        
        {/* TOP SECTION */}
        <div className=" mb-16" id="top-section">
          
          {/* Eyebrow Text */}
          <div className="mb-6">
            <span className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-accent font-mono opacity-70">
              CUSTOM APPAREL • PRINT ON DEMAND
            </span>
          </div>

          {/* Headline - Single Line, Premium Fashion, BLACK TEXT */}
          <h1 
            id="hero-heading"
            className="mb-12"
            style={{
              fontSize: 'clamp(48px, 5vw, 72px)',
              fontWeight: 600,
              letterSpacing: '-0.03em',
              lineHeight: 1.0,
              color: '#000000',
              fontFamily: 'inherit',
              textAlign: 'center',
            }}
          >
            Print it. Wear it. Flaunt it.
          </h1>
        </div>

        {/* SAFE ZONE - PROTECTED PRODUCT AREA */}
        <div 
          className="w-full" 
          id="protected-zone"
          aria-hidden="true"
          style={{ 
            minHeight: 260,
            maxHeight: 300,
            flexShrink: 0
          }}
        />

        {/* BOTTOM SECTION */}
        <div className="mt-16 flex flex-col items-center text-center w-full max-w-xl" id="bottom-section">
          
          {/* Trust Indicators - Single Row, Centered */}
          <div className="flex flex-wrap justify-center gap-3 mb-10" role="list" aria-label="Trust indicators">
            <span className="badge text-xs px-4 py-2" role="listitem">
              <span aria-hidden="true">✓</span> 10K+ Orders
            </span>
            <span className="badge text-xs px-4 py-2" role="listitem">
              <span aria-hidden="true">✓</span> Premium Quality
            </span>
            <span className="badge text-xs px-4 py-2" role="listitem">
              <span aria-hidden="true">✓</span> PAN India Delivery
            </span>
          </div>

          {/* CTA Buttons - Centered, Equal Spacing */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button className="btn-accent inline-flex items-center justify-center gap-2 font-semibold rounded-xl px-8 py-4 text-lg transition-all duration-200">
              Start Designing
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" /></svg>
            </button>
            <button className="btn-accent-outline inline-flex items-center justify-center font-semibold rounded-xl px-7 py-3.5 text-base transition-all hover:bg-accent-light">
              Shop Collection
            </button>
          </div>

          {/* Scroll Indicator */}
          <div className="flex flex-col items-center gap-2 text-accent/50 text-xs">
            <div className="animate-bounce">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
            <span>Scroll to explore</span>
          </div>
        </div>
      </div>

      {/* Single Full-Width Video Background */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        >
          <source src="/videos/hero-desktop.webm" type="video/webm" />
          <source src="/videos/hero-mobile.webm" type="video/webm" />
        </video>

        {/* Subtle gradient overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/10 to-transparent" />
      </div>

      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 z-50 h-[3px] w-full origin-left transform scale-x-0 bg-gradient-to-r from-accent to-accent-hover scroll-progress" id="scroll-progress" />
    </section>
  )
}