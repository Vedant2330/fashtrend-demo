// Brand Configuration Constants

export const BRAND = {
  name: 'Fashtrend',
  handle: '@fash__trend',
  tagline: 'Print it. Wear it. Flaunt it.',
  description: 'Custom oversized tees, kids\' fits & festival specials. Made in Pune, PAN India delivery.',
  location: 'Pune, Maharashtra',
  delivery: 'PAN India',
  whatsappNumber: '919172107395',
  instagramUrl: 'https://instagram.com/fash__trend',
  email: 'hello@fashtrend.com',
}

export const COLORS = {
  // Premium neutral palette
  background: '#FAFAF5',        // Warm white - feels like paper/fabric
  backgroundAlt: '#F5F0E8',     // Vintage cream for sections
  textPrimary: '#0D0D0D',       // Deep black, softer than pure #000
  textSecondary: '#3D3D3D',     // Mid-gray for hierarchy
  textMuted: '#6B6B6B',         // Muted text
  
  // Single accent - warm taupe/gold (premium, Indian heritage feel)
  accent: '#7B6B5A',            // Warm taupe/gold
  accentHover: '#6B5B4A',       // Darker for hover states
  accentLight: '#E8E0D5',       // Light accent for backgrounds
  
  // Borders & dividers
  border: '#E5E2DC',            // Subtle warm divider
  borderStrong: '#D4CFC5',      // Stronger borders
  
  // Feedback colors (muted premium versions)
  success: '#5A7A5A',           // Muted green
  error: '#8B5E5E',             // Muted red
  warning: '#A67C52',           // Muted amber
  
  // Legacy support (for backward compatibility)
  charcoal: '#1C1C1C',
  electricBlue: '#7B6B5A',      // Replaced with accent
  cream: '#FAFAF5',
  accentOrange: '#7B6B5A',      // Replaced with accent
  white: '#FAFAF5',             // Replaced with warm white
  gray800: '#1C1C1C',
  gray700: '#2D2D2D',
  gray600: '#3D3D3D',
} as const

export const TEE_COLORS = [
  { name: 'Optic White', value: '#FAFAF5', label: 'Optic White' },
  { name: 'Vintage Cream', value: '#F5F0E8', label: 'Vintage Cream' },
  { name: 'Charcoal', value: '#1C1C1C', label: 'Charcoal' },
  { name: 'True Black', value: '#0A0A0A', label: 'True Black' },
  { name: 'Sand', value: '#D4C9BE', label: 'Sand' },
  { name: 'Olive', value: '#4A5538', label: 'Olive' },
  { name: 'Burgundy', value: '#6B2D3D', label: 'Burgundy' },
] as const

export const PLACEMENTS = [
  { id: 'front', name: 'Front', icon: '☐', description: 'Center chest' },
  { id: 'back', name: 'Back', icon: '☐', description: 'Full back' },
  { id: 'left-sleeve', name: 'Left Sleeve', icon: '☐', description: 'Left sleeve' },
  { id: 'right-sleeve', name: 'Right Sleeve', icon: '☐', description: 'Right sleeve' },
  { id: 'all-over', name: 'All Over', icon: '⬜', description: 'Full coverage' },
] as const

export const PRINT_SIZES = [
  { id: 'standard', name: 'Standard (10×10")', multiplier: 1.0 },
  { id: 'large', name: 'Large (12×12")', multiplier: 1.3 },
  { id: 'oversized', name: 'Oversized (14×14")', multiplier: 1.6 },
] as const

export const PRICING = {
  basePrice: 499,
  printCost: 199,
  sleeveCost: 99,
  allOverMultiplier: 2.5,
  bulkDiscount: {
    10: 0.1,
    25: 0.15,
    50: 0.2,
    100: 0.25,
  },
} as const

export const PRODUCT_CATEGORIES = [
  { id: 'new-arrivals', name: 'New Arrivals', emoji: '✨' },
  { id: 'custom-tees', name: 'Custom Tees', emoji: '🎨' },
  { id: 'kids-fits', name: "Kids' Fits", emoji: '👶' },
  { id: 'festival-specials', name: 'Festival Specials', emoji: '🎉' },
  { id: 'bulk-corporate', name: 'Bulk/Corporate', emoji: '🏢' },
] as const

export const TRUST_PILLS = [
  { text: '10K+ Orders', icon: '📦' },
  { text: 'PAN India', icon: '🇮🇳' },
  { text: 'DM Support', icon: '💬' },
  { text: 'Secure Pay', icon: '🔒' },
] as const

export const HERO_COPY = {
  headline: ['Print it.', 'Wear it.', 'Flaunt it.'],
  subtext: 'Custom oversized tees • Made in Pune • PAN India • 50% Off New Year',
  primaryCTA: 'Start Your Design',
  secondaryCTA: 'Shop Ready-to-Wear',
}

export interface CarouselProduct {
  id: string
  title: string
  category: string
  price: number
  originalPrice?: number
  image: string
  images?: string[] // for flip card back
  badge?: string
  sizes: string[]
}

export const CAROUSEL_PRODUCTS: Record<string, CarouselProduct[]> = {
  'new-arrivals': [
    {
      id: 'world-cup-streetwear',
      title: 'World Cup Streetwear Tee',
      category: 'New Arrivals',
      price: 799,
      originalPrice: 999,
      image: '/images/products/world-cup.webp',
      images: ['/images/products/world-cup.webp', '/images/products/world-cup-back.webp'],
      badge: 'New',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    },
    {
      id: 'cool-bold-oversized',
      title: 'Cool & Bold Oversized',
      category: 'New Arrivals',
      price: 699,
      image: '/images/products/cool-bold.webp',
      images: ['/images/products/cool-bold.webp', '/images/products/cool-bold-back.webp'],
      badge: 'Trending',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    },
    {
      id: '2026-confidence',
      title: '2026 Confidence Tee',
      category: 'New Arrivals',
      price: 749,
      originalPrice: 899,
      image: '/images/products/2026-confidence.webp',
      images: ['/images/products/2026-confidence.webp', '/images/products/2026-confidence-back.webp'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    },
    {
      id: 'new-vibe-custom',
      title: 'New Vibe Custom Tee',
      category: 'New Arrivals',
      price: 699,
      image: '/images/products/new-vibe.webp',
      images: ['/images/products/new-vibe.webp', '/images/products/new-vibe-back.webp'],
      badge: 'Just Dropped',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    },
    {
      id: 'cultural-vibe',
      title: 'Cultural Vibe Tee',
      category: 'New Arrivals',
      price: 799,
      image: '/images/products/cultural-vibe.webp',
      images: ['/images/products/cultural-vibe.webp', '/images/products/cultural-vibe-back.webp'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    },
  ],
  'custom-tees': [
    {
      id: 'custom-attitude',
      title: 'Custom Attitude Tee',
      category: 'Custom Tees',
      price: 699,
      image: '/images/products/custom-attitude.webp',
      images: ['/images/products/custom-attitude.webp', '/images/products/custom-attitude-back.webp'],
      badge: 'Best Seller',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    },
    {
      id: 'new-vibe-custom-2',
      title: 'New Vibe Custom',
      category: 'Custom Tees',
      price: 699,
      image: '/images/products/new-vibe.webp',
      images: ['/images/products/new-vibe.webp', '/images/products/new-vibe-back.webp'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    },
    {
      id: 'cool-bold-custom',
      title: 'Cool & Bold Custom',
      category: 'Custom Tees',
      price: 749,
      image: '/images/products/cool-bold.webp',
      images: ['/images/products/cool-bold.webp', '/images/products/cool-bold-back.webp'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    },
    {
      id: 'custom-oversized',
      title: 'Custom Oversized Tee',
      category: 'Custom Tees',
      price: 799,
      image: '/images/products/cool-bold.webp',
      images: ['/images/products/cool-bold.webp', '/images/products/cool-bold-back.webp'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    },
    {
      id: 'custom-allover',
      title: 'All-Over Print Tee',
      category: 'Custom Tees',
      price: 1299,
      originalPrice: 1499,
      image: '/images/products/custom-attitude.webp',
      images: ['/images/products/custom-attitude.webp', '/images/products/custom-attitude-back.webp'],
      badge: 'Premium',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    },
  ],
  'kids-fits': [
    {
      id: 'princess-iron',
      title: "Princess Iron Tee",
      category: "Kids' Fits",
      price: 499,
      originalPrice: 599,
      image: '/images/products/princess-iron.webp',
      images: ['/images/products/princess-iron.webp', '/images/products/princess-iron-back.webp'],
      badge: 'Kids Fave',
      sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-12Y'],
    },
    {
      id: 'kids-oversized',
      title: 'Kids Oversized Tee',
      category: "Kids' Fits",
      price: 449,
      image: '/images/products/cool-bold.webp',
      images: ['/images/products/cool-bold.webp', '/images/products/cool-bold-back.webp'],
      sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-12Y'],
    },
    {
      id: 'kids-custom',
      title: 'Custom Kids Tee',
      category: "Kids' Fits",
      price: 549,
      image: '/images/products/new-vibe.webp',
      images: ['/images/products/new-vibe.webp', '/images/products/new-vibe-back.webp'],
      sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-12Y'],
    },
    {
      id: 'kids-festival',
      title: 'Festival Kids Tee',
      category: "Kids' Fits",
      price: 499,
      image: '/images/products/cultural-vibe.webp',
      images: ['/images/products/cultural-vibe.webp', '/images/products/cultural-vibe-back.webp'],
      badge: 'New',
      sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-12Y'],
    },
    {
      id: 'kids-bundle',
      title: 'Kids Bundle (3 Tees)',
      category: "Kids' Fits",
      price: 1299,
      originalPrice: 1647,
      image: '/images/products/princess-iron.webp',
      images: ['/images/products/princess-iron.webp', '/images/products/princess-iron-back.webp'],
      badge: 'Save 20%',
      sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-12Y'],
    },
  ],
  'festival-specials': [
    {
      id: 'cultural-vibe-fest',
      title: 'Cultural Vibe Tee',
      category: 'Festival Specials',
      price: 799,
      image: '/images/products/cultural-vibe.webp',
      images: ['/images/products/cultural-vibe.webp', '/images/products/cultural-vibe-back.webp'],
      badge: 'Festival Pick',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    },
    {
      id: '2026-confidence-fest',
      title: '2026 Confidence Tee',
      category: 'Festival Specials',
      price: 749,
      originalPrice: 899,
      image: '/images/products/2026-confidence.webp',
      images: ['/images/products/2026-confidence.webp', '/images/products/2026-confidence-back.webp'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    },
    {
      id: '50off-newyear',
      title: '50% Off New Year Special',
      category: 'Festival Specials',
      price: 399,
      originalPrice: 799,
      image: '/images/products/50off-newyear.webp',
      images: ['/images/products/50off-newyear.webp', '/images/products/50off-newyear-back.webp'],
      badge: '50% OFF',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    },
    {
      id: 'festival-bundle',
      title: 'Festival Bundle (3 Tees)',
      category: 'Festival Specials',
      price: 1999,
      originalPrice: 2697,
      image: '/images/products/cultural-vibe.webp',
      images: ['/images/products/cultural-vibe.webp', '/images/products/cultural-vibe-back.webp'],
      badge: 'Best Value',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    },
    {
      id: 'limited-edition',
      title: 'Limited Edition Festive',
      category: 'Festival Specials',
      price: 999,
      image: '/images/products/2026-confidence.webp',
      images: ['/images/products/2026-confidence.webp', '/images/products/2026-confidence-back.webp'],
      badge: 'Limited',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    },
  ],
  'bulk-corporate': [
    {
      id: 'bulk-10-pack',
      title: '10-Pack Corporate Tees',
      category: 'Bulk/Corporate',
      price: 3999,
      originalPrice: 4990,
      image: '/images/products/custom-attitude.webp',
      images: ['/images/products/custom-attitude.webp', '/images/products/custom-attitude-back.webp'],
      badge: '20% OFF',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    },
    {
      id: 'bulk-25-pack',
      title: '25-Pack Team Order',
      category: 'Bulk/Corporate',
      price: 8749,
      originalPrice: 12475,
      image: '/images/products/cool-bold.webp',
      images: ['/images/products/cool-bold.webp', '/images/products/cool-bold-back.webp'],
      badge: '30% OFF',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    },
    {
      id: 'bulk-50-pack',
      title: '50-Pack Event Merch',
      category: 'Bulk/Corporate',
      price: 14999,
      originalPrice: 24950,
      image: '/images/products/cultural-vibe.webp',
      images: ['/images/products/cultural-vibe.webp', '/images/products/cultural-vibe-back.webp'],
      badge: '40% OFF',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    },
    {
      id: 'bulk-100-pack',
      title: '100-Pack Corporate Bundle',
      category: 'Bulk/Corporate',
      price: 24999,
      originalPrice: 49900,
      image: '/images/products/2026-confidence.webp',
      images: ['/images/products/2026-confidence.webp', '/images/products/2026-confidence-back.webp'],
      badge: '50% OFF',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    },
    {
      id: 'custom-bulk',
      title: 'Custom Bulk Quote',
      category: 'Bulk/Corporate',
      price: 0,
      image: '/images/products/new-vibe.webp',
      images: ['/images/products/new-vibe.webp', '/images/products/new-vibe-back.webp'],
      badge: 'Get Quote',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    },
  ],
}

export const CAROUSEL_TABS = [
  { id: 'new-arrivals', label: 'New Arrivals', emoji: '✨' },
  { id: 'custom-tees', label: 'Custom Tees', emoji: '🎨' },
  { id: 'kids-fits', label: "Kids' Fits", emoji: '👶' },
  { id: 'festival-specials', label: 'Festival Specials', emoji: '🎉' },
  { id: 'bulk-corporate', label: 'Bulk/Corporate', emoji: '🏢' },
] as const

export type CarouselTabId = (typeof CAROUSEL_TABS)[number]['id']

export interface UGCItem {
  id: string
  image: string
  videoUrl?: string
  caption: string
  author: string
  authorHandle: string
  authorAvatar?: string
  likes: number
  isVideo: boolean
  tags: string[]
}

export const UGC_ITEMS: UGCItem[] = [
  {
    id: 'modi-meloni',
    image: '/images/ugc/modi-meloni.webp',
    caption: 'When PM Modi met PM Meloni wearing Fashtrend 🇮🇳🇮🇹 Proud moment for Indian fashion!',
    author: 'Fashtrend',
    authorHandle: '@fash__trend',
    likes: 12400,
    isVideo: false,
    tags: ['proudmoment', 'indianfashion', 'modi', 'meloni'],
  },
  {
    id: 'army-day',
    image: '/images/ugc/army-day.webp',
    caption: 'Army Day tribute - wearing our custom printed tees with pride. Jai Hind! 🇮🇳',
    author: 'Fashtrend',
    authorHandle: '@fash__trend',
    likes: 8900,
    isVideo: false,
    tags: ['armyday', 'tribute', 'indianarmy', 'customtee'],
  },
  {
    id: 'customer-1',
    image: '/images/ugc/customer-1.webp',
    caption: 'Custom birthday tee for my little one! Quality is amazing 😍 #fashtrend',
    author: 'Priya Sharma',
    authorHandle: '@priya_sharma_',
    likes: 1200,
    isVideo: false,
    tags: ['birthday', 'custom', 'kids', 'happy'],
  },
  {
    id: 'customer-2',
    image: '/images/ugc/customer-2.webp',
    caption: 'Festival season sorted! Got matching family tees from @fash__trend ✨',
    author: 'Rahul & Family',
    authorHandle: '@rahul_fam',
    likes: 2100,
    isVideo: false,
    tags: ['festival', 'family', 'matching', 'celebration'],
  },
  {
    id: 'customer-3',
    image: '/images/ugc/customer-3.webp',
    caption: 'Corporate event merch done right! Team loved the quality 💼',
    author: 'TechCorp Solutions',
    authorHandle: '@techcorp_in',
    likes: 3400,
    isVideo: false,
    tags: ['corporate', 'team', 'merch', 'quality'],
  },
  {
    id: 'customer-4',
    image: '/images/ugc/customer-4.webp',
    caption: 'My custom design came out better than expected! The print quality is 🔥',
    author: 'Arjun Patel',
    authorHandle: '@arjun_patel_',
    likes: 1800,
    isVideo: false,
    tags: ['custom', 'design', 'quality', 'satisfied'],
  },
  {
    id: 'customer-5',
    image: '/images/ugc/customer-5.webp',
    caption: 'Kids festival collection is a hit! My daughter refuses to take it off 😂',
    author: 'Neha Gupta',
    authorHandle: '@neha_g_',
    likes: 1500,
    isVideo: false,
    tags: ['kids', 'festival', 'daughter', 'comfort'],
  },
  {
    id: 'customer-6',
    image: '/images/ugc/customer-6.webp',
    caption: 'Bulk order for college fest - delivered on time, great quality! 🎓',
    author: 'IIT Delhi Fest',
    authorHandle: '@iitdelhi_fest',
    likes: 2800,
    isVideo: false,
    tags: ['college', 'fest', 'bulk', 'delivery'],
  },
  {
    id: 'reel-1',
    image: '/images/ugc/reel-1.webp',
    videoUrl: '/videos/ugc-reel-1.mp4',
    caption: 'Behind the scenes: How we print your custom tees 🎨',
    author: 'Fashtrend',
    authorHandle: '@fash__trend',
    likes: 5600,
    isVideo: true,
    tags: ['behindthescenes', 'printing', 'process', 'custom'],
  },
  {
    id: 'reel-2',
    image: '/images/ugc/reel-2.webp',
    videoUrl: '/videos/ugc-reel-2.mp4',
    caption: 'Unboxing our festival special collection! 🎉',
    author: 'Fashtrend',
    authorHandle: '@fash__trend',
    likes: 4300,
    isVideo: true,
    tags: ['unboxing', 'festival', 'collection', 'new'],
  },
  {
    id: 'customer-7',
    image: '/images/ugc/customer-7.webp',
    caption: 'Wore this to my cousin\'s wedding - got so many compliments! 💍',
    author: 'Sneha Reddy',
    authorHandle: '@sneha_r_',
    likes: 2200,
    isVideo: false,
    tags: ['wedding', 'compliments', 'style', 'ethnic'],
  },
  {
    id: 'customer-8',
    image: '/images/ugc/customer-8.webp',
    caption: 'Corporate gifting sorted for Diwali! Team was thrilled 🪔',
    author: 'StartupXYZ',
    authorHandle: '@startup_xyz',
    likes: 1900,
    isVideo: false,
    tags: ['diwali', 'corporate', 'gifting', 'team'],
  },
]