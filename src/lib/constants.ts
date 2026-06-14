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
  charcoal: '#1C1E21',
  electricBlue: '#0095F6',
  cream: '#FAFAFA',
  accentOrange: '#FF6B35',
  white: '#FFFFFF',
  gray800: '#1a1a2e',
  gray700: '#2a2a3e',
  gray600: '#3a3a4e',
} as const

export const TEE_COLORS = [
  { name: 'Charcoal', value: '#1C1E21', label: 'Charcoal' },
  { name: 'Electric Blue', value: '#0095F6', label: 'Electric Blue' },
  { name: 'Cream', value: '#FAFAFA', label: 'Cream' },
  { name: 'Accent Orange', value: '#FF6B35', label: 'Accent Orange' },
  { name: 'Pure White', value: '#FFFFFF', label: 'Pure White' },
  { name: 'Deep Black', value: '#0A0A0A', label: 'Deep Black' },
  { name: 'Olive Green', value: '#4A5D23', label: 'Olive Green' },
  { name: 'Burgundy', value: '#800020', label: 'Burgundy' },
  { name: 'Navy', value: '#001F3F', label: 'Navy' },
  { name: 'Sand', value: '#F4E4BC', label: 'Sand' },
  { name: 'Slate', value: '#64748B', label: 'Slate' },
  { name: 'Rose', value: '#E11D48', label: 'Rose' },
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