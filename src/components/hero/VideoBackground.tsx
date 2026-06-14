'use client'

import { VideoHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface VideoBackgroundProps extends VideoHTMLAttributes<HTMLVideoElement> {
  srcMobile?: string
  srcDesktop?: string
  poster?: string
  className?: string
}

export const VideoBackground = forwardRef<HTMLVideoElement, VideoBackgroundProps>(
  ({ srcMobile, srcDesktop, poster, className, ...props }, ref) => {
    return (
      <div className={cn('relative w-full h-full overflow-hidden', className)} aria-hidden="true">
        {/* Mobile - Vertical Reel */}
        <video
          ref={ref}
          src={srcMobile}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="lg:hidden w-full h-full object-cover"
          {...props}
        />

        {/* Desktop - Horizontal Montage */}
        <video
          ref={ref}
          src={srcDesktop}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="hidden lg:block w-full h-full object-cover"
          {...props}
        />

        {/* Fallback poster for reduced motion or no video support */}
        {poster && (
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${poster})` }} aria-hidden="true" />
        )}
      </div>
    )
  }
)

VideoBackground.displayName = 'VideoBackground'