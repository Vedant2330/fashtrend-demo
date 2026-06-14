# MASTER PROMPT — SESSION 2: CAROUSEL, UGC & ANIMATIONS
**Project:** Fashtrend Demo Homepage  
**Session:** 2 of 3  
**Prerequisite:** Session 1 complete (Hero + 3D Configurator deployed)  
**Repo:** `/Volumes/Vedant/vedantsecondary/Projects/fashtrend-demo`

---

## 🎯 SESSION 2 GOAL
Build **Horizontal 3D Product Carousel**, **UGC Masonry Wall**, and **Scroll-triggered Section Animations**. Deploy to Vercel for review.

---

## 📦 CONTEXT FROM PREVIOUS SESSIONS (Critical)

### Session 1 Completed ✅
- Next.js 14 + Tailwind + TypeScript initialized
- Hero: Video background (IG reels) + Kinetic typography ("Print it. Wear it. Flaunt it.")
- 3D Tee Configurator: Three.js/R3F model with color picker, print upload, placement, price
- GSAP + ScrollTrigger + Framer Motion animation system initialized
- Vercel preview live

### Brand Identity (Recap)
| Element | Value |
|---------|-------|
| **Handle** | @fash__trend |
| **Core Message** | "Print it, wear it, flaunt it" |
| **Colors** | Charcoal #1C1E21, Electric Blue #0095F6, Cream #FAFAFA, Accent Orange #FF6B35 |
| **Typography** | Display: Space Grotesk/Syne | Body: System UI |
| **Key Products** | Custom oversized tees, kids' fits, festival/bulk orders |

### Instagram Assets Available (40+ processed)
| Category | Count | Source |
|----------|-------|--------|
| Product Images | 22+ | Posts DZfV8zkoUuP → DS2hV6vDzyF |
| UGC/Tagged | 12+ | Highlights: PM Modi, Army Day, Customer selfies |
| Reel Thumbnails | 14 | Reels DZC7n1QsszI → DXjhx8gCFbD |

---

## 🎯 SESSION 2 DELIVERABLES

### 1. Horizontal 3D Product Carousel (Primary)
**Component:** `ProductCarousel.tsx`
- **Layout:** Horizontal scroll, 4 cards desktop / 2.5 tablet / 1.2 mobile
- **3D Transitions:** Cube rotation / Cover flow / Card fan-out (GSAP + ScrollTrigger)
- **Tabs:** `New Arrivals` | `Custom Tees` | `Kids' Fits` | `Festival Specials` | `Bulk/Corporate`
- **Tab Switch:** Cube rotation animation (perspective 1000px, stagger entrance)

### 2. Product Cards with 3D Hover Flip
**Component:** `ProductCard.tsx`
- **Front:** Product image (AI-enhanced from IG), title, price
- **Back (Flip):** Size selector, quick-add, `DM to Order` micro-CTA
- **Flip Animation:** `flipY(180°)` on hover, 0.4s / back.out(1.7)
- **Image:** Consistent 1:1 ratio, AI-upscaled, background removed

### 3. UGC Masonry Wall
**Component:** `UGCWall.tsx`
- **Source:** Curated 12 best UGC from IG (PM Modi moment, Army Day, customer selfies)
- **Layout:** Masonry grid (4-col desk / 3 tab / 2 mob)
- **Hover:** Play reel snippet / expand image
- **CTA:** `Tag @fash__trend to be featured`

### 4. Section Scroll Animations (GSAP + ScrollTrigger)
| Section | Animation |
|---------|-----------|
| Carousel | Clip-path polygon reveal + stagger card entrance |
| UGC Wall | Stagger fade-up + scale(0.95→1) |
| Tab Switch | Cube rotation (perspective 1000px) + card stagger |
| Scroll Progress | Top progress bar (thin, electric blue) |

### 5. Asset Processing Pipeline
- Download 40+ IG images → AI upscale (2x) → Background remove → Color correct → Consistent 1:1 → Save to `/public/images/products/`

---

## 🏗️ TECHNICAL IMPLEMENTATION

### New Components Structure
```
/src/components
  /carousel
    ProductCarousel.tsx
    ProductCard.tsx
    CarouselTabs.tsx
    useCarousel3D.ts
  /ugc
    UGCWall.tsx
    UGCItem.tsx
  /animations
    useScrollReveal.ts
    useStagger.ts
  /ui
    ImageWithFallback.tsx
```

### Key Libraries
```typescript
// GSAP plugins
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Flip } from 'gsap/Flip'

// Framer Motion for layout animations
import { motion, AnimatePresence } from 'framer-motion'

// Three.js for carousel 3D (optional - can use CSS 3D transforms)
```

### Carousel 3D Options (Choose One)
| Approach | Pros | Cons |
|----------|------|------|
| **CSS 3D Transforms** | Lightweight, no Three.js overhead | Limited to card-level 3D |
| **Three.js + R3F** | True 3D scene, lighting, post-processing | Heavier, more complex |
| **Hybrid** | CSS for flip, Three.js for scene transitions | Best of both |

**Recommendation:** **CSS 3D Transforms** for card flip + **GSAP** for cube/coverflow transitions (performant, lightweight)

---

## ⚙️ SESSION 2 TASK BREAKDOWN

### 1. Asset Processing (30 min)
```bash
# Use Sharp or Cloudinary for batch processing
# Script: /scripts/process-assets.ts
# Input: 40+ IG URLs → Output: /public/images/products/*.webp (1:1, 800x800)
```

### 2. Product Carousel Core (60 min)
- `ProductCarousel.tsx` — Main container, tab state, horizontal scroll
- `ProductCard.tsx` — 3D flip card (CSS `transform-style: preserve-3d`)
- `CarouselTabs.tsx` — Tab pills with active indicator
- `useCarousel3D.ts` — Hook for GSAP cube/coverflow transitions

### 3. UGC Masonry Wall (30 min)
- `UGCWall.tsx` — Masonry layout (CSS columns or Framer Motion layout)
- `UGCItem.tsx` — Hover→expand, click→modal with reel/video

### 4. Scroll Animations (45 min)
- `useScrollReveal.ts` — Clip-path + stagger entrance
- `useStagger.ts` — Stagger children with delay
- Register all sections with ScrollTrigger

### 5. Integration & Polish (30 min)
- Import into `/src/app/page.tsx` after Configurator section
- Responsive breakpoints testing
- Performance check (LCP, CLS)

### 6. Commit & Deploy (15 min)
```bash
git add .
git commit -m "feat: Session 2 - 3D Carousel + UGC Wall + Scroll Animations"
git push
# Vercel auto-deploys
```

---

## 🎨 DESIGN SPECS (From Plan)

### Carousel Card Dimensions
| Breakpoint | Cards Visible | Card Width | Gap |
|------------|---------------|------------|-----|
| Mobile (<640px) | 1.2 | 280px | 16px |
| Tablet (640-1024px) | 2.5 | 320px | 20px |
| Desktop (>1024px) | 4 | 340px | 24px |

### Card Flip States
```css
/* Front */
.product-card-front {
  transform: rotateY(0deg);
  backface-visibility: hidden;
}

/* Back */
.product-card-back {
  transform: rotateY(180deg);
  backface-visibility: hidden;
}

/* Hover */
.product-card:hover .product-card-front { transform: rotateY(-180deg); }
.product-card:hover .product-card-back { transform: rotateY(0deg); }
```

### Tab Switch Animation (GSAP)
```typescript
// Cube rotation on tab change
gsap.to(carouselInner, {
  rotationY: targetRotation,
  duration: 0.8,
  ease: 'power2.inOut',
  onStart: () => gsap.set(cards, { opacity: 0 }),
  onComplete: () => gsap.to(cards, { opacity: 1, stagger: 0.05 })
})
```

---

## 📦 ASSET MAPPING (Session 2)

### Product Images → Carousel Cards
| IG Post | Product Title | Category | Image Path |
|---------|---------------|----------|------------|
| DZfV8zkoUuP | Cultural Vibe Tee | Festival | `/images/products/cultural-vibe.webp` |
| DZSZFyBiOmV | Custom Attitude Tee | Custom | `/images/products/custom-attitude.webp` |
| DZNF898tFZo | Princess Iron Tee | Kids | `/images/products/princess-iron.webp` |
| DYl3DDYxRHn | World Cup Streetwear | New Arrivals | `/images/products/world-cup.webp` |
| DXt5Y6pCJRx | Cool & Bold Oversized | Custom | `/images/products/cool-bold.webp` |
| DS8zCBWCLt0 | 2026 Confidence Tee | Festival | `/images/products/2026-confidence.webp` |
| DS4s1vMiB0T | New Vibe Custom | Custom | `/images/products/new-vibe.webp` |
| DS2hV6vDzyF | 50% Off New Year | Festival | `/images/products/50off-newyear.webp` |

### UGC Images → Masonry Wall
| Source | Caption | Image Path |
|--------|---------|------------|
| DYoYv_aiPjD | PM Modi/Meloni moment | `/images/ugc/modi-meloni.webp` |
| DThcWuDiKct | Army Day tribute | `/images/ugc/army-day.webp` |
| Customer tagged | Various selfies | `/images/ugc/customer-1.webp` ... |

---

## ✅ DECISION POINTS (Carried from Session 1)

| # | Decision | Choice |
|---|----------|--------|
| 1 | 3D Configurator | Full Three.js (R3F) ✅ |
| 2 | Hero video | IG reels DXjhx8gCFbD + DZC7n1QsszI ✅ |
| 3 | Product images | AI-enhanced from IG (this session) |
| 4 | Lead backend | WhatsApp deep links ✅ |
| 5 | Deploy | Vercel ✅ |

---

## 🔗 HANDOFF TO SESSION 3

### Session 3 Will Build:
- WhatsApp/IG DM deep link integration (Configurator → DM, Carousel → DM)
- Sticky urgency bar (50% off countdown timer)
- Performance optimization (lazy-load, image optimization)
- Accessibility audit (ARIA, focus states, contrast)
- Final polish + production deploy

### Session 3 Needs From This Session:
- Carousel `DM to Order` button handlers (pass product data)
- Configurator `Save & Share` → WhatsApp deep link format
- UGC `Tag us` CTA → Instagram deep link

---

## 🚀 START COMMAND FOR SESSION 2
> "Start Session 2: Continue from Session 1 at /Volumes/Vedant/vedantsecondary/Projects/fashtrend-demo. Build Horizontal 3D Product Carousel, UGC Masonry Wall, and Scroll Animations per this master prompt. Session 1 Hero + Configurator already deployed."

---

**All Session 1 context, brand data, asset mappings, and plan embedded. Ready to execute.**