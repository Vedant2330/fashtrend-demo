'use client'

import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { HERO_COPY } from '@/lib/constants'

interface MobileHeroContentProps {
  className?: string
}

export function MobileHeroContent({ className }: MobileHeroContentProps) {
  return (
    <div className={cn('absolute inset-0 flex flex-col justify-end p-6 pb-16 space-y-6', className)}>
      {/* CTA Buttons - Stacked on Mobile */}
      <div className="flex flex-col gap-3 w-full max-w-xs mx-auto">
        <Button
          size="xl"
          fullWidth
          iconPosition="right"
          className="btn-accent"
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" /></svg>}
        >
          {HERO_COPY.primaryCTA}
        </Button>
        <Button
          variant="outline"
          size="lg"
          fullWidth
          className="btn-accent-outline"
        >
          {HERO_COPY.secondaryCTA}
        </Button>
      </div>

      {/* Scroll Indicator */}
      <div className="flex flex-col items-center gap-2 text-text-muted text-xs">
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