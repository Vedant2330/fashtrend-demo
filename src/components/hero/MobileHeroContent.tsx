'use client'

import { Button } from '@/components/ui/Button'
import { ArrowRight, Shield, Globe, MessageSquare, Lock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { TRUST_PILLS, HERO_COPY } from '@/lib/constants'

interface MobileHeroContentProps {
  className?: string
}

export function MobileHeroContent({ className }: MobileHeroContentProps) {
  return (
    <div className={cn('absolute inset-0 flex flex-col justify-end p-6 pb-16 space-y-6', className)}>
      {/* Trust Pills */}
      <div className="flex flex-wrap justify-center gap-2" role="list" aria-label="Trust indicators">
        {TRUST_PILLS.map((pill, index) => (
          <span
            key={index}
            className={cn(
              'inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full',
              'bg-white/10 backdrop-blur-sm border border-white/20 text-cream'
            )}
            role="listitem"
          >
            <span aria-hidden="true">{pill.icon}</span>
            {pill.text}
          </span>
        ))}
      </div>

      {/* CTA Buttons - Stacked on Mobile */}
      <div className="flex flex-col gap-3 w-full max-w-xs mx-auto">
        <Button
          size="xl"
          fullWidth
          iconPosition="right"
          icon={<ArrowRight className="w-5 h-5" />}
        >
          {HERO_COPY.primaryCTA}
        </Button>
        <Button
          variant="outline"
          size="lg"
          fullWidth
        >
          {HERO_COPY.secondaryCTA}
        </Button>
      </div>

      {/* Scroll Indicator */}
      <div className="flex flex-col items-center gap-2 text-cream/60 text-xs">
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