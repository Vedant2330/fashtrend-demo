# MASTER PROMPT — SESSION 3: LEADS, POLISH & DEPLOY
**Project:** Fashtrend Demo Homepage  
**Session:** 3 of 3 (Final)  
**Prerequisite:** Sessions 1 & 2 complete (Hero + Configurator + Carousel + UGC + Animations deployed)  
**Repo:** `/Volumes/Vedant/vedantsecondary/Projects/fashtrend-demo`

---

## 🎯 SESSION 3 GOAL
Complete **Lead Generation Mechanics**, **Performance Optimization**, **Accessibility Audit**, **Final Polish**, and **Production Deployment** to client-shareable Vercel URL.

---

## 📦 CONTEXT FROM PREVIOUS SESSIONS

### Session 1 Completed ✅
- Hero: Video background (IG reels) + Kinetic typography
- 3D Tee Configurator: Three.js/R3F with color picker, print upload, placement, price
- Animations: Page load, scroll→configurator, ScrollTrigger setup

### Session 2 Completed ✅
- Horizontal 3D Product Carousel with cube/coverflow transitions
- Product Cards with 3D hover flip (front: image/price, back: size/DM CTA)
- UGC Masonry Wall with hover→expand
- Scroll-triggered section reveals (clip-path + stagger)

### Current Stack (Live on Vercel)
| Layer | Implementation |
|-------|----------------|
| **Framework** | Next.js 14 (App Router) + TypeScript |
| **Styling** | Tailwind CSS + CSS Variables |
| **Animation** | GSAP + ScrollTrigger + Framer Motion |
| **3D** | Three.js (R3F) + Drei |
| **Deploy** | Vercel (auto-deploy on push) |

---

## 🎯 SESSION 3 DELIVERABLES

### 1. Lead Generation Mechanics (Primary)
**All CTAs → WhatsApp/IG DM Deep Links (Zero Backend)**

| CTA Location | Deep Link Format | Parameters |
|--------------|------------------|------------|
| Hero `Start Your Design` | `whatsapp://send?text=...` | Pre-fills: "Hi Fashtrend, I want custom tee" |
| Configurator `Save & Share` | `whatsapp://send?text=...` | Includes: color, print URL, placement, price |
| Carousel Card `DM to Order` | `whatsapp://send?text=...` | Includes: product name, price, image |
| UGC `Tag Us` | `instagram://user?username=fash__trend` | Opens IG profile |
| Sticky Bar `Claim Discount` | `whatsapp://send?text=...` | Pre-fills: "NY2025 code for 50% off" |

**WhatsApp Deep Link Template:**
```typescript
const createWhatsAppLink = (params: DesignParams) => {
  const msg = encodeURIComponent(
    `Hi Fashtrend, I want to order:\n` +
    `• Product: ${params.productName || 'Custom Tee'}\n` +
    `• Color: ${params.color || '—'}\n` +
    `• Print: ${params.printUrl ? 'Attached' : 'Custom design'}\n` +
    `• Placement: ${params.placement || 'Front'}\n` +
    `• Est. Price: ₹${params.price || '—'}\n` +
    `• Discount Code: ${params.discountCode || 'NY2025'}`
  )
  return `https://wa.me/919172107395?text=${msg}`
}
```

### 2. Sticky Urgency Bar (Mobile + Desktop)
**Component:** `UrgencyBar.tsx`
- **Position:** Fixed bottom (mobile) / Slide-in right (desktop)
- **Content:** "⚡ New Year Offer: 50% Off Custom Tees — Ends Jan 31 | Code: NY2025"
- **CTA:** `Claim Discount` → WhatsApp deep link with code pre-filled
- **Animation:** Slide-up (mobile) / Slide-right (desktop) on scroll > 50%
- **Dismiss:** X button, remembers in localStorage (24hr)

### 3. Performance Optimization
| Target | Strategy |
|--------|----------|
| **LCP < 2.0s** | Preload hero video, lazy-load configurator, optimize images |
| **FID < 100ms** | Code-split Three.js (dynamic import), debounce scroll handlers |
| **CLS < 0.1** | Reserve space for video, images, carousel |
| **Total JS < 150KB** | Tree-shake, remove unused Drei exports, dynamic import Three.js |
| **Video Hero < 2MB** | WebM + MP4, preload="metadata", poster image |
| **3D Model < 100KB** | Draco compression, lazy-load on section in-view |

**Implementation:**
```typescript
// Dynamic imports for heavy components
const TeeConfigurator = dynamic(() => import('@/components/configurator/TeeConfigurator'), {
  loading: () => <ConfiguratorSkeleton />,
  ssr: false
})

const ProductCarousel = dynamic(() => import('@/components/carousel/ProductCarousel'), {
  loading: () => <CarouselSkeleton />,
  ssr: false
})
```

### 4. Accessibility Audit (WCAG 2.1 AA)
| Check | Implementation |
|-------|----------------|
| **Color Contrast** | All text ≥ 4.5:1 (charcoal on cream, blue on charcoal) |
| **Focus States** | Visible outline (electric blue, 3px) on all interactive elements |
| **ARIA Labels** | All buttons, inputs, carousel navigation |
| **Keyboard Nav** | Tab order logical, Escape closes modals, Arrow keys navigate carousel |
| **Alt Text** | All images: descriptive (product name + color + key feature) |
| **Reduced Motion** | Respect `prefers-reduced-motion` (disable GSAP/Framer animations) |
| **Video** | Muted, loop, playsinline, no auto-play sound |

### 5. Cross-Browser & Device QA
| Matrix | Status |
|--------|--------|
| **Chrome (latest)** | ✅ |
| **Firefox (latest)** | ✅ |
| **Safari (latest)** | ✅ (WebGL fallback for configurator) |
| **Edge (latest)** | ✅ |
| **Mobile Chrome (Android)** | ✅ |
| **Mobile Safari (iOS)** | ✅ |
| **Tablet (iPad)** | ✅ |

### 6. Final Polish
- **Favicon:** Brand logo (from IG profile)
- **Meta Tags:** OG title/description/image, Twitter cards
- **Sitemap:** `/sitemap.xml` (auto-generated)
- **Robots.txt:** Allow all
- **Error Boundaries:** Graceful fallback for Three.js failures
- **Loading States:** Skeletons for all async components
- **404 Page:** Branded, with "Back to Home" CTA

---

## 📦 FINAL DEPLOYMENT CHECKLIST

### Pre-Deploy
- [ ] All TypeScript errors resolved (`npm run build`)
- [ ] ESLint + Prettier clean (`npm run lint`)
- [ ] Bundle analyzer: no unexpected large deps (`npm run analyze`)
- [ ] Lighthouse CI: Performance > 90, Accessibility > 95
- [ ] Cross-browser QA passed
- [ ] Mobile testing (real device)

### Deploy Steps
```bash
# 1. Final commit
git add .
git commit -m "feat: Session 3 - Leads, Performance, Polish, Accessibility"
git push origin main

# 2. Vercel auto-deploys (or manual trigger)

# 3. Production URL: https://fashtrend-demo.vercel.app
#    Preview URLs for each commit
```

### Client Handoff Package
| Deliverable | Location |
|-------------|----------|
| **Live Demo** | `https://fashtrend-demo.vercel.app` |
| **Source Code** | GitHub repo (private) |
| **Asset Pack** | `/public/images/`, `/public/models/`, `/public/videos/` |
| **Walkthrough Video** | Loom (15 min) — design decisions, animations, lead flow |
| **Handoff Doc** | `docs/HANDOFF.md` — how to extend to full site |

---

## 📋 HANDOFF DOC STRUCTURE (`docs/HANDOFF.md`)
```markdown
# Fashtrend Demo → Full Site Extension Guide

## Current Demo Scope
- Homepage only (Hero, Configurator, Carousel, UGC, Urgency Bar)

## To Build Full Site

### 1. Product Detail Page (PDP)
- Route: `/product/[slug]`
- Reuse: ProductCard data, 3D model, WhatsApp CTA
- Add: Size guide, reviews, related products carousel

### 2. Cart & Checkout
- WhatsApp-based order form (Google Form / Typeform embed)
- Or: Razorpay/Stripe integration for direct payments
- Order tracking via WhatsApp notifications

### 3. User Accounts
- NextAuth.js (WhatsApp OTP / Email)
- Order history, saved designs, wishlist

### 4. Admin Dashboard
- Order management, design approvals, inventory
- Analytics: Configurator interactions, DM clicks, carousel swipes

### 5. SEO & Content
- Blog: `/blog/[slug]` (fashion tips, care guides)
- Category pages: `/category/[name]`
- Structured data (Product, Organization, Breadcrumbs)

## Design System Tokens (Extendable)
- Colors: CSS variables in `globals.css`
- Typography: `tailwind.config.ts` font families
- Spacing: Tailwind scale (4px base)
- Animations: GSAP presets in `lib/animations/`

## Deployment
- Vercel (production) + Preview deployments
- Environment variables: WhatsApp number, Analytics ID
```

---

## 🔧 SESSION 3 TASK BREAKDOWN

### 1. Lead Generation (60 min)
- Implement `createWhatsAppLink()` utility
- Wire all CTA buttons across Hero, Configurator, Carousel, UGC, Urgency Bar
- Test on mobile (WhatsApp opens correctly)

### 2. Urgency Bar (30 min)
- Build `UrgencyBar.tsx` with slide animations
- localStorage dismiss persistence
- Countdown timer (optional: real end date)

### 3. Performance (60 min)
- Dynamic imports for Three.js + Carousel + Configurator
- Image optimization (Next/Image config, Cloudinary)
- Bundle analysis + tree-shaking
- Lighthouse CI setup

### 4. Accessibility (30 min)
- ARIA audit + fixes
- Focus management
- Reduced motion support
- Color contrast verification

### 5. QA & Polish (30 min)
- Cross-browser testing
- Mobile real-device testing
- Error boundary testing
- Edge cases (no WebGL, slow network, missing assets)

### 6. Deploy & Handoff (15 min)
- Final commit + push
- Vercel production deploy
- Generate Handoff Doc + Loom walkthrough

---

## 🚀 START COMMAND FOR SESSION 3
> "Start Session 3: Continue from Session 2 at /Volumes/Vedant/vedantsecondary/Projects/fashtrend-demo. Complete Lead Generation (WhatsApp deep links), Urgency Bar, Performance Optimization, Accessibility Audit, Final Polish, and Production Deploy per this master prompt. Sessions 1 & 2 already deployed."

---

## 📋 FINAL CLIENT SHAREABLE URL
**Target:** `https://fashtrend-demo.vercel.app` (or custom domain)

**Demo Flow for Client:**
1. **Hero** → Video plays, kinetic type reveals → "Print it. Wear it. Flaunt it."
2. **Scroll** → 3D Configurator loads, model rotates → Customize color/upload print → `Save & Share` → WhatsApp opens
3. **Scroll** → Product Carousel → Hover flip cards → `DM to Order` → WhatsApp opens
4. **Scroll** → UGC Wall → Hover expand → "Tag us" → Instagram opens
5. **Urgency Bar** → Appears at 50% scroll → "50% Off Code: NY2025" → WhatsApp opens

---

**All previous sessions context, brand data, component architecture, and deployment steps embedded. Ready to execute final session.**