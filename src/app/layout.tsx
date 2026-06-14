import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://fashtrend-demo.vercel.app'),
  title: 'Fashtrend • Print it. Wear it. Flaunt it.',
  description: "Custom oversized tees, kids' fits & festival specials. Made in Pune, PAN India delivery. DM to order.",
  keywords: ['custom tees', 'oversized tees', 'custom clothing', 'Pune fashion', 'print on demand'],
  authors: [{ name: 'Fashtrend' }],
  creator: 'Fashtrend',
  publisher: 'Fashtrend',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://fashtrend-demo.vercel.app',
    title: 'Fashtrend • Print it. Wear it. Flaunt it.',
    description: "Custom oversized tees, kids' fits & festival specials. Made in Pune, PAN India delivery.",
    siteName: 'Fashtrend',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Fashtrend Custom Tees',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fashtrend • Print it. Wear it. Flaunt it.',
    description: "Custom oversized tees, kids' fits & festival specials. Made in Pune, PAN India delivery.",
    images: ['/images/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export const viewport: Viewport = {
  themeColor: '#FAFAF5',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-background text-text-primary antialiased">
        {children}
      </body>
    </html>
  )
}