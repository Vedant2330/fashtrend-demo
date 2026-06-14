# MASTER PROMPT — SESSION 1: SETUP, HERO & 3D CONFIGURATOR
**Project:** Fashtrend Demo Homepage  
**Session:** 1 of 3  
**Date:** June 14, 2026  
**Repo:** `/Volumes/Vedant/vedantsecondary/Projects/fashtrend-demo`

---

## 🎯 SESSION 1 GOAL
Initialize Next.js 14 project, build **Hero Section (video + kinetic typography)** and **3D Tee Configurator (Three.js/R3F)**, deploy to Vercel for review.

---

## 📦 CONTEXT FROM ANALYSIS PHASE (Critical — Read Fully)

### Brand: @fash__trend (Fashtrend Clothing & Brands)
- **Handle:** @fash__trend
- **Bio:** "Entrepreneur | Fashtrend • Print it, wear it, flaunt it 💥 | Custom tees, kids' fits & oversized drops | Perfect for gifting too 🎁"
- **Location:** Pune, Maharashtra | PAN India delivery
- **Stats:** 84 posts | 249 followers | 102 following
- **Website Link:** share.google/7U06XVtIytOVgO5A0

### Core Brand Identity
| Element | Direction |
|---------|-----------|
| **Core Message** | "Print it, wear it, flaunt it" — Customization as self-expression |
| **Visual Language** | Bold oversized tees + vibrant prints + Indian cultural moments + streetwear energy |
| **Audience** | Gen-Z/Gen-Y (18-35), Pune-based but PAN India delivery |
| **Trust Signals** | 50% off promos, Army Day/Festival cultural relevance, Celebrity UGC (PM Modi), DM-to-order simplicity |
| **Color Palette** | Deep charcoal (#1C1E21), Electric blue (#0095F6), Cream (#FAFAFA), Accent orange (#FF6B35) |
| **Typography** | Display: Bold, wide sans (Space Grotesk / Syne) | Body: Clean system UI |

### Instagram Content Analyzed (22 Posts + 14 Reels)
**Key Posts Extracted:**
1. **DZfV8zkoUuP** — "India on the move, culture in every mile" (cultural vibe)
2. **DZSZFyBiOmV** — "Wear your attitude. Print your story." (custom tees pitch)
3. **DZNF898tFZo** — "Iron Deficiency Princess" (female-focused, cute tee)
4. **DYoYv_aiPjD** — PM Modi/Meloni moment (celebrity UGC, high engagement)
5. **DYl3DDYxRHn** — Football world cup vibe (streetwear)
6. **DXt5Y6pCJRx** — "Stay cool, stay bold" (unisex oversized)
7. **DXjhx8gCFbD** (REEL) — Kendrick Lamar audio, "Fresh fits, outdoor vibes"
8. **DZC7n1QsszI** (REEL) — "POV: personality → comfort, confidence & style"
9. **DTfFN-wCEKx** — Makar Sankranti 50% off (festival promo)
10. **DThcWuDiKct** — Army Day tribute 🇮🇳
11. **DS8zCBWCLt0** — New Year "Step into 2026 wearing confidence"
12. **DS4s1vMiB0T** — "New year. New vibe. Your design, your rules."
13. **DS2hV6vDzyF** — "New Year, New Gear! 50% OFF custom tees"

**Image Assets:** 40+ image URLs captured from IG (scontent.cdninstagram.com)
**Reel Assets:** 14 reel URLs captured

---

## 🏗️ MASTER PLAN (From Fashtrend_Demo_Plan.md)

### Tech Stack (Locked)
| Layer | Choice |
|-------|--------|
| **Framework** | Next.js 14 (App Router) + TypeScript |
| **Styling** | Tailwind CSS + CSS Variables |
| **Animation** | GSAP + ScrollTrigger + Framer Motion |
| **3D** | Three.js (React Three Fiber) + Drei |
| **Image Opt** | Next/Image + Cloudinary/Auto CDN |
| **Forms/Leads** | React Hook Form + Zod + WhatsApp/IG deep links |
| **Deploy** | Vercel |

### Session 1 Deliverables
```
✅ Next.js 14 project initialized with Tailwind + TypeScript
✅ Dependencies: gsap, @react-three/fiber, @react-three/drei, framer-motion
✅ Hero Section: Video background (IG reels) + Kinetic typography
✅ 3D Tee Configurator: Three.js model with color picker, print upload, placement, price
✅ Vercel deployment with preview URL
✅ GitHub repo with clean commit history
```

---

## 🎬 ASSET STRATEGY (Session 1)

### Hero Video Strategy (Mobile vs Desktop)
| Breakpoint | Source | Format | Behavior |
|------------|--------|--------|----------|
| **Mobile (< 768px)** | **Original IG Reel** (DXjhx8gCFbD) | 9:16 vertical | Full-screen, auto-play, muted, loop |
| **Desktop (≥ 768px)** | **Custom Cinematic Montage** (from 40 IG images) | 16:9 horizontal | 20s Ken Burns loop, muted, seamless |

### Brand Colors (CSS Variables - Already in globals.css)
```css
:root {
  --color-charcoal: #1C1E21;
  --color-electric-blue: #0095F6;
  --color-cream: #FAFAFA;
  --color-accent-orange: #FF6B35;
  --color-white: #FFFFFF;
  --color-gray-800: #1a1a2e;
  --color-gray-700: #2a2a3e;
  --color-gray-600: #3a3a4e;
}
```

---

## ⚙️ SESSION 1 TASK BREAKDOWN

### 1. Project Initialization ✅ DONE

### 2. Dependencies ✅ DONE
```bash
npm install gsap @react-three/fiber @react-three/drei framer-motion lucide-react
```

### 3. Project Structure ✅ DONE
```
/src
  /app
    /globals.css ✅
    /layout.tsx
    /page.tsx
  /components
    /hero
      HeroSection.tsx
      VideoBackground.tsx
      KineticTypography.tsx
      MobileHeroContent.tsx
      DesktopHeroContent.tsx
    /configurator
      TeeConfigurator.tsx
      Canvas3D.tsx
      ColorPicker.tsx
      PrintUpload.tsx
      PlacementSelector.tsx
      PriceDisplay.tsx
    /ui
      Button.tsx
  /lib
    /utils.ts
    /constants.ts (brand colors, config)
  /hooks
    /useScrollAnimation.ts
/public
  /models (tee.glb)
  /videos (hero-mobile.webm, hero-desktop.webm, .mp4)
  /images (processed IG assets)
```

### 4. Hero Section (Current Task)
**Components to Build:**
- `HeroSection.tsx` — Main wrapper, responsive mobile/desktop
- `VideoBackground.tsx` — Auto-play, muted, loop, playsinline, preload="metadata"
- `KineticTypography.tsx` — "Print it. Wear it. Flaunt it." — word-by-word stagger reveal (GSAP)
- `MobileHeroContent.tsx` — Stacked CTAs, thumb-reachable
- `DesktopHeroContent.tsx` — Side-by-side content, KineticTypography + CTAs + Trust Pills

**CTA Buttons:** `Start Your Design` (scroll to configurator), `Shop Ready-to-Wear` (scroll to carousel)
**Trust Pills:** `10K+ Orders` `PAN India` `DM Support` `Secure Payments`

### 5. 3D Tee Configurator
- `TeeConfigurator.tsx` — Main container
- `Canvas3D.tsx` — R3F canvas, lazy-loaded, orbit controls (disabled on mobile)
- `TeeModel.tsx` — Load tee.glb, apply materials, UV mapping for print zones
- `ColorPicker.tsx` — 12 brand colors (grid, radio-style)
- `PrintUpload.tsx` — Drag-drop zone, file validation (image, <10MB), preview on model
- `PlacementSelector.tsx` — Front | Back | Left Sleeve | Right Sleeve | All-over (icons)
- `PriceDisplay.tsx` — Base price + print cost + quantity selector
- **Actions:** `Save Design` → `DM to Order` (WhatsApp deep link with design params)

### 6. Animation Setup
- **Page Load:** Hero text stagger (0.05s), video fade-in, CTA scale-up (1.2s / power3.out)
- **Scroll → Configurator:** Canvas fade-in + model rotation (y: 0→360), panel slide (1s / expo.out)
- **ScrollTrigger:** Register all sections for reveal animations

### 7. Placeholder 3D Model
- Download simple tee.glb from open source (Three.js examples or Sketchfab)
- Place at `/public/models/tee.glb`
- UV mapped for print zones (front, back, sleeves)

### 8. Asset Processing (Background)
- Download IG reel DXjhx8gCFbD → trim 10s → hero-mobile
- Curate 20 frames from 40 IG images → create desktop montage → hero-desktop
- Extract poster frame

---

## ✅ DECISION POINTS (Confirmed for Session 1)

| # | Decision | Confirmed Choice |
|---|----------|------------------|
| 1 | **3D Configurator scope** | **Full Three.js (R3F)** |
| 2 | **Hero video source** | **IG reel mobile + custom montage desktop** |
| 3 | **Product images** | **AI-enhanced from IG** (Session 2) |
| 4 | **Lead backend** | **WhatsApp deep links** (zero backend) |
| 4 | **Deploy** | **Vercel** |

---

## 🚀 START COMMAND
> "Start Session 1: Initialize Next.js project at /Volumes/Vedant/vedantsecondary/Projects/fashtrend-demo, build Hero + 3D Configurator per this master prompt."

---

**All analysis data, brand assets, and plan context embedded above. No external references needed.**