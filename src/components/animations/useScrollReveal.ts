'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Hook for scroll-triggered reveal animations with clip-path or fade/scale
 */
export function useScrollReveal(
  selector: string,
  options: {
    trigger?: string | Element
    start?: string
    end?: string
    scrub?: number | boolean
    animationType?: 'clip-path' | 'fade-up' | 'fade-in' | 'scale'
    stagger?: number
    delay?: number
    duration?: number
    ease?: string
    once?: boolean
  } = {}
) {
  const {
    trigger,
    start = 'top 85%',
    end = 'top 40%',
    scrub = false,
    animationType = 'fade-up',
    stagger = 0.08,
    delay = 0,
    duration = 0.8,
    ease = 'power2.out',
    once = true,
  } = options

  const ctxRef = useRef<gsap.Context | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray<HTMLElement>(selector)
      if (elements.length === 0) return

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: trigger || elements[0],
          start,
          end,
          scrub,
          toggleActions: once ? 'play none none reverse' : 'play none none reverse',
          once,
        },
      })

      switch (animationType) {
        case 'clip-path': {
          tl.fromTo(elements,
            { 
              clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
              opacity: 0,
            },
            { 
              clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
              opacity: 1,
              duration,
              stagger,
              delay,
              ease,
            }
          )
          break
        }
        case 'fade-up': {
          tl.fromTo(elements,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration, stagger, delay, ease }
          )
          break
        }
        case 'fade-in': {
          tl.fromTo(elements,
            { opacity: 0 },
            { opacity: 1, duration, stagger, delay, ease }
          )
          break
        }
        case 'scale': {
          tl.fromTo(elements,
            { opacity: 0, scale: 0.95 },
            { opacity: 1, scale: 1, duration, stagger, delay, ease }
          )
          break
        }
      }
    })

    ctxRef.current = ctx

    return () => {
      ctx.revert()
    }
  }, [selector, trigger, start, end, scrub, animationType, stagger, delay, duration, ease, once])

  return ctxRef.current
}

/**
 * Hook for staggered child animations
 */
export function useStagger(
  selector: string,
  options: {
    trigger?: string | Element
    start?: string
    end?: string
    stagger?: number
    from?: 'start' | 'center' | 'end' | 'edges' | 'random' | number
    axis?: 'x' | 'y'
    duration?: number
    ease?: string
    once?: boolean
  } = {}
) {
  const {
    trigger,
    start = 'top 85%',
    end = 'top 40%',
    stagger = 0.08,
    from = 'start',
    axis = undefined,
    duration = 0.6,
    ease = 'power2.out',
    once = true,
  } = options

  const ctxRef = useRef<gsap.Context | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray<HTMLElement>(selector)
      if (elements.length === 0) return

      gsap.fromTo(elements,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration,
          stagger: { amount: stagger * elements.length, from, axis: axis ?? undefined },
          ease,
          scrollTrigger: {
            trigger: trigger || elements[0],
            start,
            end,
            toggleActions: once ? 'play none none reverse' : 'play none none reverse',
            once,
          },
        }
      )
    })

    ctxRef.current = ctx

    return () => {
      ctx.revert()
    }
  }, [selector, trigger, start, end, stagger, from, axis, duration, ease, once])

  return ctxRef.current
}

/**
 * Hook for parallax scroll effects
 */
export function useParallax(
  selector: string,
  options: {
    speed?: number
    direction?: 'vertical' | 'horizontal'
    trigger?: string | Element
    start?: string
    end?: string
  } = {}
) {
  const { speed = 0.5, direction = 'vertical', trigger, start = 'top bottom', end = 'bottom top' } = options

  const ctxRef = useRef<gsap.Context | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray<HTMLElement>(selector)
      if (elements.length === 0) return

      elements.forEach((el) => {
        gsap.to(el, {
          yPercent: direction === 'vertical' ? -100 * speed : 0,
          xPercent: direction === 'horizontal' ? -100 * speed : 0,
          ease: 'none',
          scrollTrigger: {
            trigger: trigger || el,
            start,
            end,
            scrub: true,
          },
        })
      })
    })

    ctxRef.current = ctx

    return () => {
      ctx.revert()
    }
  }, [selector, speed, direction, trigger, start, end])

  return ctxRef.current
}

/**
 * Hook for scroll progress indicator
 */
export function useScrollProgress(
  selector: string = '#scroll-progress',
  options: {
    trigger?: string | Element
    start?: string
    end?: string
  } = {}
) {
  const { trigger = 'body', start = 'top top', end = 'bottom bottom' } = options

  const ctxRef = useRef<gsap.Context | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const progressBar = document.querySelector<HTMLElement>(selector)
      if (!progressBar) return

      ScrollTrigger.create({
        trigger,
        start,
        end,
        onUpdate: (self) => {
          gsap.set(progressBar, { scaleX: self.progress })
        },
      })
    })

    ctxRef.current = ctx

    return () => {
      ctx.revert()
    }
  }, [selector, trigger, start, end])

  return ctxRef.current
}