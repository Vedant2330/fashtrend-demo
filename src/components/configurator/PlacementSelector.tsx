'use client'

import { cn } from '@/lib/utils'
import { PLACEMENTS } from '@/lib/constants'

interface PlacementSelectorProps {
  selectedPlacement: string
  onPlacementChange: (placement: string) => void
  className?: string
}

export function PlacementSelector({ selectedPlacement, onPlacementChange, className }: PlacementSelectorProps) {
  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-cream">Print Placement</h3>
        <span className="text-xs text-cream/50">Select where to print</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3" role="radiogroup" aria-label="Select print placement">
        {PLACEMENTS.map((placement) => (
          <button
            key={placement.id}
            type="button"
            role="radio"
            aria-checked={selectedPlacement === placement.id}
            aria-label={placement.description}
            onClick={() => onPlacementChange(placement.id)}
            className={cn(
              'relative p-4 rounded-xl text-center transition-all duration-200',
              'bg-white/5 backdrop-blur-sm border-2 transition-all duration-200',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal',
              selectedPlacement === placement.id
                ? 'border-electric-blue bg-electric-blue/10 shadow-lg shadow-electric-blue/20'
                : 'border-gray-600 hover:border-gray-500 hover:bg-white/5'
            )}
          >
            <div className="text-3xl mb-2" aria-hidden="true">{placement.icon}</div>
            <div className="font-medium text-cream">{placement.name}</div>
            <div className="text-xs text-cream/50 mt-1">{placement.description}</div>
            
            {selectedPlacement === placement.id && (
              <div className="absolute top-2 right-2 w-5 h-5 bg-electric-blue text-charcoal rounded-full flex items-center justify-center" aria-hidden="true">
                <svg className="w-3.5 h-3.5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>

      <p className="text-center text-sm text-cream/50">
        Multiple placements multiply the print cost
      </p>
    </div>
  )
}