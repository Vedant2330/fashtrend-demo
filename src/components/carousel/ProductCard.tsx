'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { cn, formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import type { CarouselProduct } from '@/lib/constants'

// WhatsApp icon component - using a simpler path
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.52 3.48A11.97 11.97 0 0012 0C5.37 0 0 5.37 0 12c0 1.74.39 3.41 1.09 4.94L0 24l5.92-1.56A11.94 11.94 0 0012 24c6.63 0 12-5.37 12-12 0-1.8-.39-3.53-1.09-5.12L22.2 1.8A12.02 12.02 0 0020.52 3.48zm-5.7 11.29c-.29-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.08-.15-.67-1.61-.92-2.2-.2-.6-.49-.5-.67-.51-.18 0-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.47 0 1.47.79 2.79 1.28 3.65.45.77.86 1.34 1.3 1.77.44.43.92 1.01 1.39 1.55.48.54.81 1 1.05 1.39.24.39.4.86.55 1.21.15.35.25.7.29.9.05.2.04.3-.01.36-.07.03-.38.23-.8 1.12z" />
    </svg>
  )
}

interface ProductCardProps {
  product: CarouselProduct
  index: number
}

export function ProductCard({ product, index }: ProductCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [hovered, setHovered] = useState(false)

  // Auto-flip on hover for desktop
  useEffect(() => {
    const handleMouseEnter = () => setIsFlipped(true)
    const handleMouseLeave = () => setIsFlipped(false)
    
    const card = document.querySelector(`[data-card-id="${product.id}"]`)
    if (card) {
      card.addEventListener('mouseenter', handleMouseEnter)
      card.addEventListener('mouseleave', handleMouseLeave)
    }
    return () => {
      if (card) {
        card.removeEventListener('mouseenter', handleMouseEnter)
        card.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [product.id])

  const handleWhatsAppOrder = () => {
    const msg = encodeURIComponent(
      `Hi Fashtrend, I want to order:\n` +
      `• Product: ${product.title}\n` +
      `• Category: ${product.category}\n` +
      `• Price: ${formatPrice(product.price)}\n` +
      `• Sizes available: ${product.sizes.join(', ')}\n\n` +
      `Please help me with sizing and delivery!`
    )
    window.open(`https://wa.me/919172107395?text=${msg}`, '_blank')
  }

  return (
    <motion.div
      ref={(el) => { if (el) el.setAttribute('data-card-id', product.id) }}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] } }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative"
      style={{ perspective: 1000 }}
    >
      <div
        className={cn(
          'relative w-full aspect-square rounded-2xl overflow-hidden',
          'bg-background border border-border',
          'shadow-lg shadow-accent/5 hover:shadow-xl hover:shadow-accent/10',
          'transition-all duration-500 ease-out',
        )}
        style={{
          transformStyle: 'preserve-3d',
          transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
        onMouseEnter={() => setIsFlipped(true)}
        onMouseLeave={() => setIsFlipped(false)}
        onTouchStart={() => setIsFlipped(!isFlipped)}
      >
        {/* Front Face */}
        <div
          className="absolute inset-0 backface-hidden w-full h-full"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(0deg)',
          }}
        >
          {/* Product Image */}
          <div className="relative w-full h-[70%] overflow-hidden">
            <motion.img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-500"
              style={{ transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
              onLoad={() => setImageLoaded(true)}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 bg-background-alt flex items-center justify-center">
                <div className="animate-pulse text-text-muted">Loading...</div>
              </div>
            )}
            
            {/* Badge */}
            {product.badge && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold"
                style={{
                  background: 'var(--color-accent)',
                  color: 'var(--color-background)',
                }}
              >
                {product.badge}
              </motion.div>
            )}

            {/* Discount Badge */}
            {product.originalPrice && product.originalPrice > product.price && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold bg-error text-background"
              >
                {Math.round((1 - product.price / product.originalPrice!) * 100)}% OFF
              </motion.div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-4 space-y-2">
            <p className="text-xs font-medium text-text-muted uppercase tracking-wider">
              {product.category}
            </p>
            <h3 className="font-semibold text-text-primary text-lg line-clamp-1">
              {product.title}
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-text-primary">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-sm line-through text-text-muted">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Back Face - Quick Actions */}
        <div
          className="absolute inset-0 backface-hidden w-full h-full flex flex-col items-center justify-center p-4 gap-4"
          style={{
            backfaceVisibility: 'hidden',
            background: 'var(--color-background)',
            transform: 'rotateY(180deg)',
            borderRadius: '1rem',
          }}
        >
          <div className="text-center w-full">
            <p className="text-sm font-medium text-text-primary mb-1">Select Size</p>
            <div className="flex flex-wrap justify-center gap-1.5">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className="px-3 py-1.5 text-xs font-medium rounded-xl border border-border text-text-secondary hover:border-accent hover:text-accent hover:bg-accent-light transition-all duration-200"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full space-y-2 pt-2 border-t border-border">
            <Button
              variant="primary"
              size="md"
              fullWidth
              onClick={handleWhatsAppOrder}
              icon={<WhatsAppIcon />}
              iconPosition="left"
            >
              DM to Order
            </Button>
            <Button
              variant="outline"
              size="md"
              fullWidth
              onClick={handleWhatsAppOrder}
            >
              Quick Add
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}