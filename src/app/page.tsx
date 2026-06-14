import { HeroSection } from '@/components/hero/HeroSection'
import { TeeConfigurator } from '@/components/configurator/TeeConfigurator'

export default function Home() {
  return (
    <main className="min-h-screen bg-charcoal">
      <HeroSection />
      <TeeConfigurator />
    </main>
  )
}