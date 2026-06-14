'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { UGCItem } from '@/lib/constants'

interface UGCItemProps {
  item: UGCItem
  index: number
  onOpenModal?: (item: UGCItem) => void
}

export function UGCItem({ item, index, onOpenModal }: UGCItemProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleClick = () => {
    if (onOpenModal) {
      onOpenModal(item)
    } else if (item.isVideo && item.videoUrl) {
      // Open video in new tab or modal
      window.open(item.videoUrl, '_blank')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ scale: 1.02, y: -4, transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] } }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={item.isVideo ? `Play video: ${item.caption}` : `View post by ${item.author}`}
      className={cn(
        'relative group cursor-pointer',
        'bg-background border border-border rounded-2xl overflow-hidden',
        'shadow-lg shadow-accent/5 hover:shadow-xl hover:shadow-accent/10',
        'transition-all duration-500 ease-out'
      )}
      style={{
        aspectRatio: item.isVideo ? '9/16' : '4/5',
      }}
    >
      {/* Image/Video Thumbnail */}
      <div className="relative w-full h-full overflow-hidden">
        <motion.img
          src={item.image}
          alt={item.caption}
          className="w-full h-full object-cover transition-transform duration-700 ease-out"
          style={{
            transform: isHovered ? 'scale(1.08)' : 'scale(1)',
            filter: isHovered && !item.isVideo ? 'brightness(0.9)' : 'none',
          }}
          onLoad={() => setImageLoaded(true)}
        />
        {!imageLoaded && (
          <div className="absolute inset-0 bg-background-alt flex items-center justify-center">
            <div className="animate-pulse text-text-muted">Loading...</div>
          </div>
        )}

        {/* Video Play Indicator */}
        {item.isVideo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm"
            transition={{ duration: 0.3 }}
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-16 h-16 rounded-full bg-accent/90 flex items-center justify-center shadow-2xl"
            >
              <svg className="w-8 h-8 text-background ml-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </motion.div>
          </motion.div>
        )}

        {/* Hover Overlay for Images */}
        {!item.isVideo && (
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-4"
                transition={{ duration: 0.3 }}
              >
                <div className="text-white">
                  <p className="font-medium text-sm line-clamp-2">{item.caption}</p>
                  <div className="flex items-center gap-2 mt-2 text-xs opacity-80">
                    <span>♥ {item.likes.toLocaleString()}</span>
                    <span>·</span>
                    <span>{item.author}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {/* Author Badge - Top Left */}
        <div className="absolute top-3 left-3 flex items-center gap-2 bg-background/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg z-10">
          <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center">
            <span className="text-xs font-bold text-accent">{item.author.charAt(0)}</span>
          </div>
          <span className="text-xs font-medium text-text-primary max-w-[120px] truncate">{item.author}</span>
          {item.authorHandle === '@fash__trend' && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-accent text-background">OFFICIAL</span>
          )}
        </div>

        {/* Tags - Bottom Left on Hover */}
        <AnimatePresence>
          {isHovered && item.tags.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-3 left-3 flex flex-wrap gap-1.5 z-10"
              transition={{ delay: 0.1 }}
            >
              {item.tags.slice(0, 4).map((tag) => (
                <span key={tag} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-sm text-text-primary">
                  #{tag}
                </span>
              ))}
              {item.tags.length > 4 && (
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-sm text-text-muted">
                  +{item.tags.length - 4}
                </span>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Caption Overlay for Video Items - Bottom */}
      {item.isVideo && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
          <p className="text-sm font-medium line-clamp-2">{item.caption}</p>
          <div className="flex items-center gap-3 mt-2 text-xs opacity-80">
            <span>♥ {item.likes.toLocaleString()}</span>
            <span>▶ Watch Reel</span>
          </div>
        </div>
      )}
    </motion.div>
  )
}