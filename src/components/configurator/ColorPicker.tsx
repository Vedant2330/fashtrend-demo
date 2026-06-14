'use client'

import { cn } from '@/lib/utils'
import { Palette, Check } from 'lucide-react'
import { TEE_COLORS } from '@/lib/constants'

interface ColorPickerProps {
  selectedColor: string
  onColorChange: (color: string) => void
  className?: string
}

export function ColorPicker({ selectedColor, onColorChange, className }: ColorPickerProps) {
  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-cream">Base Color</h3>
        <Palette className="w-5 h-5 text-electric-blue" aria-hidden="true" />
      </div>
      
      <div 
        className="flex flex-wrap gap-2" 
        role="radiogroup" 
        aria-label="Select base color"
        aria-describedby="color-picker-hint"
      >
        {TEE_COLORS.map((color) => (
          <button
            key={color.name}
            type="button"
            role="radio"
            aria-checked={selectedColor === color.value}
            aria-label={color.label}
            onClick={() => onColorChange(color.value)}
            className={cn(
              'relative w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 transition-all duration-200',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal',
              selectedColor === color.value
                ? 'border-electric-blue scale-110 shadow-lg shadow-electric-blue/30'
                : 'border-gray-600 hover:border-gray-500 hover:scale-105'
            )}
            style={{ backgroundColor: color.value }}
            title={color.label}
          >
            {selectedColor === color.value && (
              <span className="absolute inset-0 flex items-center justify-center">
                <svg className="w-5 h-5 text-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </span>
            )}
          </button>
        ))}
      </div>
      
      <p id="color-picker-hint" className="text-sm text-cream/50 text-center">
        Tap to select base tee color
      </p>
    </div>
  )
}