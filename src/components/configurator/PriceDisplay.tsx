'use client'

import { cn } from '@/lib/utils'
import { PRICING, PRINT_SIZES } from '@/lib/constants'
import { Package, Tag, Minus, Plus } from 'lucide-react'

interface PriceDisplayProps {
  basePrice: number
  printCost: number
  quantity: number
  onQuantityChange: (qty: number) => void
  selectedSizes: string[]
  onSizeToggle: (size: string) => void
  className?: string
}

export function PriceDisplay({ 
  basePrice, 
  printCost, 
  quantity, 
  onQuantityChange,
  selectedSizes,
  onSizeToggle,
  className 
}: PriceDisplayProps) {
  const printSizeCost = selectedSizes.reduce((total, size) => {
    const sizeConfig = PRINT_SIZES.find(s => s.id === size)
    return total + (sizeConfig?.multiplier || 1) * printCost
  }, 0)

  const subtotal = (basePrice + printSizeCost) * quantity
  const discount = quantity >= 100 ? 0.25 : quantity >= 50 ? 0.2 : quantity >= 25 ? 0.15 : quantity >= 10 ? 0.1 : 0
  const discountAmount = subtotal * discount
  const total = subtotal - discountAmount

  return (
    <div className={cn('space-y-6 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10', className)}>
      <h3 className="text-xl font-bold text-cream flex items-center gap-2">
        <Tag className="w-5 h-5 text-electric-blue" />
        Price Breakdown
      </h3>

      <div className="space-y-3 border-t border-white/10 pt-4">
        <div className="flex justify-between text-sm">
          <span className="text-cream/70 flex items-center gap-2">
            <Package className="w-4 h-4" />
            Base Tee
          </span>
          <span className="font-medium text-cream">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(basePrice)}</span>
        </div>

        {selectedSizes.length > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-cream/70 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Print ({selectedSizes.join(', ')})
            </span>
            <span className="font-medium text-cream">
              {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(printSizeCost)}
            </span>
          </div>
        )}

        <div className="flex justify-between text-sm">
          <span className="text-cream/70 flex items-center gap-2">
            <Package className="w-4 h-4" />
            Quantity
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className={cn(
                'w-10 h-10 rounded-xl flex items-center justify-center text-cream font-bold',
                'bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed',
                'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue'
              )}
            >
              <span className="text-xl">−</span>
            </button>
            <span className="w-12 text-center text-lg font-bold text-cream">{quantity}</span>
            <button
              onClick={() => onQuantityChange(quantity + 1)}
              className={cn(
                'w-10 h-10 rounded-xl flex items-center justify-center text-cream font-bold',
                'bg-white/5 hover:bg-white/10 transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue'
              )}
            >
              <span className="text-xl">+</span>
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 pt-4 space-y-2">
        <div className="flex justify-between text-base">
          <span className="text-cream/70">Subtotal</span>
          <span className="font-medium text-cream">
            {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(subtotal)}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-base text-green-400">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2m0 0l3 3m-3-3l-3 3" />
              </svg>
              Bulk Discount ({Math.round(discount * 100)}%)
            </span>
            <span>−{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(discountAmount)}</span>
          </div>
        )}

        <div className="flex justify-between text-lg font-bold pt-2 border-t border-white/10">
          <span className="text-cream">Total</span>
          <span className="text-electric-blue">
            {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(total)}
          </span>
        </div>

        {quantity >= 10 && (
          <p className="text-xs text-green-400 text-center mt-2">
            ✓ Bulk discount applied! {discount > 0 ? `${Math.round(discount * 100)}% off` : 'Eligible for bulk pricing'}
          </p>
        )}
      </div>

      <div className="pt-4 border-t border-white/10">
        <p className="text-xs text-cream/50 text-center">
          * GST & shipping calculated at checkout • PAN India delivery
        </p>
      </div>
    </div>
  )
}