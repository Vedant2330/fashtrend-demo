import { HeroSection } from '@/components/hero/HeroSection'
import { TeeConfigurator } from '@/components/configurator/TeeConfigurator'
import { Navbar } from '@/components/ui/Navbar'
import { ProductCarousel } from '@/components/carousel/ProductCarousel'
import { UGCWall } from '@/components/ugc/UGCWall'

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <HeroSection />
        <TeeConfigurator />
        <ProductCarousel />
        <UGCWall />
      </main>
    </>
  )
}