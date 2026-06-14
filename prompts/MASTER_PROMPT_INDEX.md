# FASHTREND DEMO — MASTER PROMPT INDEX
**Project:** Fashtrend Demo Homepage  
**Location:** `/Volumes/Vedant/vedantsecondary/Projects/fashtrend-demo`  
**Created:** June 14, 2026  
**Total Sessions:** 3

---

## 📁 PROJECT STRUCTURE
```
/Volumes/Vedant/vedantsecondary/Projects/fashtrend-demo/
├── prompts/
│   ├── SESSION_1_MASTER_PROMPT.md    # Setup, Hero, 3D Configurator
│   ├── SESSION_2_MASTER_PROMPT.md    # Carousel, UGC, Animations
│   └── SESSION_3_MASTER_PROMPT.md    # Leads, Polish, Deploy
├── docs/
│   └── Fashtrend_Demo_Plan.md        # Full strategic plan (source)
├── src/                              # Next.js source (Session 1+)
├── public/                           # Assets (images, models, videos)
├── assets/                           # Raw IG downloads
└── package.json                      # Dependencies
```

---

## 📋 SESSION OVERVIEW

| Session | Focus | Key Deliverables | Est. Time |
|---------|-------|------------------|-----------|
| **1** | Setup, Hero, 3D Configurator | Next.js init, Video Hero, 3D Tee Configurator (R3F) | ~3 hrs |
| **2** | Carousel, UGC, Animations | 3D Product Carousel, UGC Masonry, Scroll Animations | ~2.5 hrs |
| **3** | Leads, Polish, Deploy | WhatsApp Deep Links, Urgency Bar, Perf/Accessibility, Deploy | ~2 hrs |

**Total: ~7.5 hrs across 3 sessions**

---

## 🎯 QUICK START COMMANDS

### Session 1 (Run First)
```bash
cd /Volumes/Vedant/vedantsecondary/Projects/fashtrend-demo
# Read: prompts/SESSION_1_MASTER_PROMPT.md
# Then execute steps in that prompt
```

### Session 2 (After Session 1 Deployed)
```bash
cd /Volumes/Vedant/vedantsecondary/Projects/fashtrend-demo
git pull origin main
# Read: prompts/SESSION_2_MASTER_PROMPT.md
# Execute steps
```

### Session 3 (After Session 2 Deployed)
```bash
cd /Volumes/Vedant/vedantsecondary/Projects/fashtrend-demo
git pull origin main
# Read: prompts/SESSION_3_MASTER_PROMPT.md
# Execute steps
```

---

## 🔑 KEY DECISIONS (Pre-Confirmed)

| # | Decision | Choice |
|---|----------|--------|
| 1 | 3D Configurator | **Full Three.js (R3F)** |
| 2 | Hero Video | **IG Reels Mobile + Custom Montage Desktop** |
| 3 | Product Images | **AI-enhanced from IG** |
| 4 | Lead Backend | **WhatsApp Deep Links (zero backend)** |
| 5 | Deploy Target | **Vercel** |

---

## 📊 BRAND CONTEXT (Quick Reference)

### @fash__trend Identity
- **Handle:** @fash__trend
- **Core:** "Print it, wear it, flaunt it" — Custom oversized tees
- **Location:** Pune, Maharashtra | PAN India
- **Colors:** Charcoal #1C1E21, Electric Blue #0095F6, Cream #FAFAFA, Accent Orange #FF6B35
- **Typography:** Display: Space Grotesk | Body: System UI

### Key Instagram Assets (Captured)
| Type | Count | Key Items |
|--------|-------|-----------|
| Posts | 22 | Cultural vibe, Custom pitch, Princess tee, PM Modi moment, Army Day, New Year offers |
| Reels | 14 | POV personality, Kendrick Lamar outdoor vibes |
| Images | 40+ URLs | From scontent.cdninstagram.com |
| UGC | 12+ | PM Modi/Meloni, Army Day, Customer selfies |

---

## 🛠️ TECH STACK (Locked)

| Layer | Choice |
|-------|--------|
| **Framework** | Next.js 14 (App Router) + TypeScript |
| **Styling** | Tailwind CSS + CSS Variables |
| **Animation** | GSAP + ScrollTrigger + Framer Motion |
| **3D** | Three.js (React Three Fiber) + Drei |
| **Forms/Leads** | React Hook Form + Zod + WhatsApp/IG Deep Links |
| **Deploy** | Vercel (auto-deploy on push) |

---

## 📦 ASSET PIPELINE

### Source (Already Captured)
- **40+ IG Image URLs** from scontent.cdninstagram.com
- **14 Reel URLs** from scontent.cdninstagram.com
- **Brand Profile** data (bio, highlights, stats)

### Processing Needed (Session 2)
```bash
# 1. Download all IG images
# 2. AI Upscale (2x) → Remove Background → Color Correct → 1:1 ratio
# 3. Save to /public/images/products/ (WebP, 800x800)
# 4. Reels → Trim 8-12s loops → Mute → Compress WebM/MP4 <2MB
# 5. Save to /public/videos/
```

---

## 🎬 FINAL CLIENT DEMO FLOW

1. **Hero** → Video auto-plays (muted), "Print it. Wear it. Flaunt it." kinetic reveal
2. **Scroll** → 3D Configurator loads → Customize tee → `Save & Share` → **WhatsApp opens with design details**
3. **Scroll** → Product Carousel → Hover 3D flip → `DM to Order` → **WhatsApp opens with product details**
4. **Scroll** → UGC Wall → Hover expand → `Tag @fash__trend` → **Instagram opens**
5. **50% Scroll** → Urgency Bar slides in → "50% Off Code: NY2025" → **WhatsApp opens with code**

---

## 🚀 EXECUTION ORDER

```
SESSION 1                    SESSION 2                    SESSION 3
─────────────────────────────────────────────────────────────────
1. Init Next.js              1. Process 40+ IG assets       1. WhatsApp deep links
2. Tailwind + deps           2. 3D Carousel + Flip cards    2. Urgency Bar
3. Hero (Video + Type)       3. UGC Masonry Wall            3. Performance opt
4. 3D Tee Configurator       4. Scroll Animations           4. Accessibility
5. GSAP/ScrollTrigger        5. Integrate + Deploy          5. QA + Polish
6. Deploy → Vercel           6. Deploy → Vercel             6. Final Deploy
7. Git commit + push         7. Git commit + push           7. Handoff Doc
```

---

## 📞 SESSION HANDOFF PROTOCOL

### Between Sessions:
1. **Code** → GitHub (source of truth)
2. **Preview** → Vercel preview URL (test mobile/desktop)
3. **Feedback** → Note issues for next session
4. **Next Session** → `git pull` → Continue

### Session Start Prompt Template:
> "Start Session [N]: Continue from Session [N-1] at /Volumes/Vedant/vedantsecondary/Projects/fashtrend-demo. Build [focus] per prompts/SESSION_N_MASTER_PROMPT.md. Previous session deployed at [Vercel URL]."

---

## 📞 SUPPORT CONTACTS
- **WhatsApp (Client):** +91 9172107395 (Piyush — for final demo)
- **Instagram:** @fash__trend (Brand reference)
- **GitHub:** [Repo URL after Session 1 init]
- **Vercel:** [Preview URLs after each deploy]

---

**All session prompts, brand context, tech decisions, and execution plan consolidated here. Ready to execute Session 1.**