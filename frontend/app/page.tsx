import HeroSection from "@/components/hero-section"
import { CarSearchForm } from "@/components/car-search-form"
import PopularOffers from "@/components/popular-offers"
import CarCollections from "@/components/car-collections"
import WhyChooseUs from "@/components/why-choose-us"
import Testimonials from "@/components/testimonials"
import CallToAction from "@/components/call-to-action"
import YandexMap from "@/components/yandex-map"

export default function Home() {
  return (
    <div className="bg-background">
      <HeroSection />
      <CarSearchForm />
      <PopularOffers />
      <CarCollections />
      <CallToAction />
      <WhyChooseUs />
      <Testimonials />
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Как нас найти</h2>
          <YandexMap center={[55.613012, 37.754054]} zoom={15} />
        </div>
      </section>
    </div>
  )
}

