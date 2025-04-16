import HeroSection from '@/components/hero-section'
import { CarSearchForm } from '@/components/car-search-form'
import PopularOffers from '@/components/popular-offers'
import WhyChooseUs from '@/components/why-choose-us'
import Testimonials from '@/components/testimonials'
import CallToAction from '@/components/call-to-action'

export default function AppPage() {
  return (
    <div className="bg-background">
      <HeroSection />
      <CarSearchForm />
      <PopularOffers />
      <CallToAction />
      <WhyChooseUs />
      <Testimonials />
    </div>
  )
}

