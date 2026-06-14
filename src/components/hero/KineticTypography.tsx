'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

interface KineticTypographyProps {
  words?: string[]
  className?: string
  triggerRef?: React.RefObject<HTMLElement>
  stagger?: number
  delay?: number
  onComplete?: () => void
}

export function KineticTypography({
  words = ['Print it.', 'Wear it.', 'Flaunt it.'],
  className,
  triggerRef,
  stagger = 0.08,
  delay = 0.2,
  onComplete,
}: KineticTypographyProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const wordsRef = useRef<HTMLSpanElement[]>([])
  const animationRef = useRef<gsap.core.Timeline | null>(null)

  const ref = triggerRef || containerRef

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Prepare elements
      gsap.set(wordsRef.current, { opacity: 0, y: 30, rotationX: -20 })

      const tl = gsap.timeline({
        delay,
        onComplete: () => {
          ScrollTrigger.refresh()
          onComplete?.()
        },
      })

      tl.to(wordsRef.current, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.8,
        stagger,
        ease: 'power3.out',
      })

      animationRef.current = tl
    }, ref)

    return () => {
      ctx.revert()
      animationRef.current?.kill()
    }
  }, [ref, stagger, delay, onComplete])

  return (
    <div
      ref={containerRef}
      className={cn('flex flex-col gap-1 text-center', className)}
      role="heading"
      aria-level={1}
    >
      {words.map((word, index) => (
        <span
          key={index}
          ref={(el) => { wordsRef.current[index] = el! }}
          className="whitespace-nowrap"
          style={{ willChange: 'opacity, transform' }}
        >
          {word}
        </span>
      ))}
    </div>
  )
}