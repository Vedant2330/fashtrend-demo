'use client'

import { Button } from '@/components/ui/Button'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { TRUST_PILLS, HERO_COPY } from '@/lib/constants'

interface DesktopHeroContentProps {
  className?: string
}

export function DesktopHeroContent({ className }: DesktopHeroContentProps) {
  return (
    <div className={cn('flex flex-col justify-center px-12 py-20 max-w-3xl', className)}>
      {/* Kinetic Typography */}
      <div className="space-y-1" role="heading" aria-level={1}>
        {HERO_COPY.headline.map((word, index) => (
          <span
            key={index}
            className={cn(
              'block text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight',
              'bg-gradient-to-r from-text-primary via-accent/60 to-accent-hover',
              'bg-clip-text text-transparent',
              'opacity-0 translate-y-8',
              'will-change-opacity,will-change-transform'
            )}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {word}
          </span>
        ))}
      </div>

      {/* Subtext */}
      <p className="mt-6 text-lg md:text-xl text-text-secondary max-w-xl leading-relaxed">
        {HERO_COPY.subtext}
      </p>

      {/* Trust Pills */}
      <div className="mt-8 flex flex-wrap gap-2" role="list" aria-label="Trust indicators">
        {TRUST_PILLS.map((pill, index) => (
          <span
            key={index}
            className={cn(
              'inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full',
              'badge'
            )}
            role="listitem"
          >
            <span aria-hidden="true">{pill.icon}</span>
            {pill.text}
          </span>
        ))}
      </div>

      {/* CTA Buttons - Side by Side on Desktop */}
      <div className="mt-10 flex flex-col sm:flex-row gap-4">
        <Button
          size="xl"
          iconPosition="right"
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" /></svg>}
          className="w-full sm:w-auto btn-accent"
        >
          {HERO_COPY.primaryCTA}
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="w-full sm:w-auto btn-accent-outline"
        >
          {HERO_COPY.secondaryCTA}
        </Button>
      </div>

      {/* Scroll Indicator */}
      <div className="mt-16 flex flex-col items-center gap-2 text-text-muted text-xs">
        <div className="animate-bounce">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
        <span>Scroll to explore</span>
      </div>
    </div>
  )
}