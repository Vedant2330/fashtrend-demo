'use client'

import { useState, useCallback } from 'react'
import { Canvas3D } from './Canvas3D'
import { ColorPicker } from './ColorPicker'
import { PrintUpload } from './PrintUpload'
import { PlacementSelector } from './PlacementSelector'
import { TRUST_PILLS, TEE_COLORS, PLACEMENTS, PRINT_SIZES, PRICING } from '@/lib/constants'

interface TeeConfiguratorProps {
  className?: string
}

export function TeeConfigurator({ className }: TeeConfiguratorProps) {
  const [color, setColor] = useState<string>(TEE_COLORS[0].value)
  const [printFile, setPrintFile] = useState<File | null>(null)
  const [printPreview, setPrintPreview] = useState<string | null>(null)
  const [placements, setPlacements] = useState<string[]>(['front'])
  const [sizes, setSizes] = useState<string[]>(['standard'])
  const [quantity, setQuantity] = useState(1)
  const [isSaving, setIsSaving] = useState(false)

  const calculateTotal = () => {
    const printSizeCost = PRINT_SIZES
      .filter(s => sizes.includes(s.id))
      .reduce((total, size) => total + (size.multiplier * PRICING.printCost), 0)
    
    const subtotal = (PRICING.basePrice + PRICING.printCost) * quantity
    const discount = quantity >= 100 ? 0.25 : quantity >= 50 ? 0.2 : quantity >= 25 ? 0.15 : quantity >= 10 ? 0.1 : 0
    return Math.round((PRICING.basePrice + PRICING.printCost) * quantity * (1 - (quantity >= 100 ? 0.25 : quantity >= 50 ? 0.2 : quantity >= 25 ? 0.15 : quantity >= 10 ? 0.1 : 0)))
  }

  const createWhatsAppLink = () => {
    const msg = encodeURIComponent(
      `Hi Fashtrend, I want to order:\n` +
      `• Product: Custom Tee\n` +
      `• Color: ${TEE_COLORS.find(c => c.value === color)?.label || color}\n` +
      `• Print: ${printFile ? 'Attached (custom design)' : 'None (solid color)'}\n` +
      `• Placement: ${placements.map(p => PLACEMENTS.find(pl => pl.id === p)?.name).join(', ')}\n` +
      `• Size: ${sizes.map(s => PRINT_SIZES.find(sz => sz.id === s)?.name).join(', ')}\n` +
      `• Quantity: ${quantity}\n` +
      `• Est. Price: ₹${calculateTotal()}\n` +
      `• Discount Code: NY2025`
    )
    return `https://wa.me/919172107395?text=${msg}`
  }

  const handleSaveAndShare = () => {
    window.open(createWhatsAppLink(), '_blank')
  }

  const toggleSize = useCallback((size: string) => {
    setSizes(prev => 
      prev.includes(size)
        ? prev.filter(s => s !== size)
        : [...prev, size]
    )
  }, [])

  const cn = (...classes: (string | undefined | null | false)[]) => {
    return classes.filter(Boolean).join(' ')
  }

  const getSizeButtonClass = (sizeId: string) => {
    const base = 'px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 bg-white/5 backdrop-blur-sm border-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal '
    const active = 'border-electric-blue bg-electric-blue/10 text-electric-blue'
    const inactive = 'border-gray-600 text-cream/70 hover:border-gray-500 hover:bg-white/5'
    return cn(base, sizes.includes(sizeId) ? active : inactive)
  }

  return (
    <section 
      id="configurator"
      className="py-20 lg:py-28 px-6"
      aria-labelledby="configurator-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 id="configurator-heading" className="text-4xl lg:text-5xl font-extrabold text-cream mb-4">
            Design Your <span className="text-electric-blue">Perfect Tee</span>
          </h2>
          <p className="text-lg text-cream/70 max-w-2xl mx-auto">
            Pick your color, upload your design, choose placement — see it live in 3D, then order via WhatsApp.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-7">
            <div className="sticky top-24">
              <Canvas3D 
                modelPath="/models/tee.glb"
                className="shadow-2xl shadow-electric-blue/10"
              />
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="sticky top-24 space-y-6 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4 lg:pr-0">
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-cream flex items-center gap-2">
                  <svg className="w-5 h-5 text-electric-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17a4 4 0 01-4-4v-12a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4H7z" />
                  </svg>
                  Base Color
                </h3>
                
                <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Select base color">
                  {TEE_COLORS.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      role="radio"
                      aria-checked={color === c.value}
                      aria-label={c.label}
                      onClick={() => setColor(c.value)}
                      className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
                      style={{ backgroundColor: c.value, borderColor: color === c.value ? '#0095F6' : '#4B5563' }}
                      title={c.label}
                    >
                      {color === c.value && (
                        <span className="absolute inset-0 flex items-center justify-center">
                          <svg className="w-5 h-5 text-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                      )}
                    </button>
                  ))}
                </div>
                
                <p className="text-xs text-cream/50 text-center mt-2">
                  Tap to select base tee color
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-cream">Print Size</h3>
                  <span className="text-xs text-cream/50">Select print dimensions</span>
                </div>
                <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Select print size">
                  {PRINT_SIZES.map((size) => (
                    <button
                      key={size.id}
                      type="button"
                      role="radio"
                      aria-checked={sizes.includes(size.id)}
                      onClick={() => setSizes(prev => 
                        prev.includes(size.id)
                          ? prev.filter(s => s !== size.id)
                          : [...prev, size.id]
                      )}
                      className={getSizeButtonClass(size.id)}
                    >
                      {size.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-cream">Quantity</h3>
                  <span className="text-xs text-cream/50">Bulk discounts apply at 10+</span>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-cream font-bold bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue"
                  >
                    <span className="text-xl">−</span>
                  </button>
                  <span className="w-12 text-center text-xl font-bold text-cream">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-cream font-bold bg-white/5 hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue"
                  >
                    <span>+</span>
                  </button>
                  <span className="text-sm text-cream/50 ml-2">
                    {quantity >= 10 ? '✓ Bulk discount active!' : `${10 - quantity} more for bulk pricing`}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <a 
                  href={`https://wa.me/919172107395?text=${encodeURIComponent('Hi Fashtrend, I want to order a custom tee!')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-charcoal bg-[#25D366] rounded-xl hover:bg-[#25D366]/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.27-.099-.47-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.15-.172.2-.296.3-.495.099-.198.05-.371-.025-.52-.075-.148-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-.98 2.475.056 1.474.79 2.79 1.285 3.65.435.764.858 1.344 1.295 1.774.436.436.917 1.008 1.392 1.55.474.54.81.994 1.05 1.393.23.395.4.864.55 1.21.15.345.245.688.288.898.047.224.04.332-.005.363-.07.034-.38.23-.8 1.116zm4.542-5.769c-1.055.128-2.223.843-4.136.843h-5.79c-1.913 0-3.08-.72-4.137-.842-.99-.109-1.554-.308-1.705-.47-.145-.137-.403-.38-.591-.442-.128-.06-.41-.138-.443-.327-.01-.105.115-.18.29-.32.14-.14.81-.583 1.17-.8.12-.054.55-.158.81-.265.92-.375 1.62-.488 2.17-.488.45 0 1.45.12 2.1.36 1.08.46 1.72.98 2.22 1.34.09.07.16.1.14.09-.02-.21-.07-.41-.07-.39.02-.1.02-.18-.02-.27 0-.11.03-.49-.05-.64-.2-.36-.56-.7-.95-.95-.7-.4-.84-.52-.8-.5.04-.02.27-.05.52-.07l.39-.02c.58-.062 1.1-.12 1.33-.06.19.06.16.2-.07.3-.4.17-.97.49-1.07 1.24-.11.78-.12 1.5-.11 2.31 0 1.1.26 2-.96 2.62-.98.54-1.75.82-2.18.96-.45.14-2.16.62-2.16.62zM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22.8c-5.969 0-10.8-4.83-10.8-10.8S6.03 1.2 12 1.2s10.8 4.83 10.8 10.8-4.83 10.8-10.8 10.8z" />
                  </svg>
                  <span className="font-semibold">Save &amp; Share via WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}