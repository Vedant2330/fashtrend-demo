'use client'

import { VideoBackground } from './VideoBackground'
import { KineticTypography } from './KineticTypography'
import { MobileHeroContent } from './MobileHeroContent'
import { DesktopHeroContent } from './DesktopHeroContent'
import { cn } from '@/lib/utils'

interface HeroSectionProps {
  className?: string
  videoMobileSrc?: string
  videoDesktopSrc?: string
  posterSrc?: string
}

export function HeroSection({
  className,
  videoMobileSrc = '/videos/hero-mobile.webm',
  videoDesktopSrc = '/videos/hero-desktop.webm',
  posterSrc = '/images/hero-poster.jpg',
}: HeroSectionProps) {
  return (
    <section
      className={cn('relative min-h-screen flex flex-col overflow-hidden', className)}
      aria-labelledby="hero-heading"
    >
      {/* Background Videos */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <VideoBackground
          srcMobile={videoMobileSrc}
          srcDesktop={videoDesktopSrc}
          poster={posterSrc}
          className="w-full h-full"
        />

        {/* Gradient Overlay for Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-transparent to-charcoal/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,149,246,0.1)_0%,_transparent_70%)]" />
      </div>

      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 z-50 h-[3px] w-full origin-left transform scale-x-0 bg-gradient-to-r from-electric-blue to-accent-orange scroll-progress" id="scroll-progress" />

      {/* Mobile Layout */}
      <div className="relative z-10 lg:hidden min-h-screen flex flex-col">
        <KineticTypography
          words={['Print it.', 'Wear it.', 'Flaunt it.']}
          className="mt-16 px-6"
          stagger={0.08}
          delay={0.3}
        />
        <MobileHeroContent />
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex min-h-screen">
        {/* Video Pane - Left 45% */}
        <div className="relative w-[45%] min-w-[480px] flex-shrink-0">
          <VideoBackground
            srcMobile={videoMobileSrc}
            srcDesktop={videoDesktopSrc}
            poster={posterSrc}
            className="w-full h-full"
          />
          {/* Pillarbox Blur Extension */}
          <div className="absolute inset-0 bg-[inherit] blur-[200px] opacity-30" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/60 via-transparent to-transparent" aria-hidden="true" />
        </div>

        {/* Content Pane - Right 55% */}
        <div className="relative flex-1 flex flex-col min-w-0">
          <DesktopHeroContent />
        </div>
      </div>

      {/* Scroll Indicator (Desktop) */}
      <div className="hidden lg:block absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2 text-cream/50 text-xs">
          <div className="animate-bounce">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
          <span>Scroll to explore</span>
        </div>
      </div>
    </section>
  )
}