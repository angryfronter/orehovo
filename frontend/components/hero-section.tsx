"use client"

import { useState, useCallback } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RequestForm } from "@/components/request-form"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Slide {
  badge: string
  title: string
  subtitle: string
  buttonText: string
  image: string
  link: string
}

const SLIDES: Slide[] = [
  {
    badge: "Ограниченное предложение",
    title: "Ваш идеальный автомобиль ждет вас!",
    subtitle: "Эксклюзивные предложения с выгодой до 500 000 ₽",
    buttonText: "Найти свой автомобиль",
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=1200&h=600",
    link: "/catalog",
  },
  {
    badge: "Ограниченное предложение",
    title: "Кредит от 3.9% на все модели",
    subtitle: "Одобрение за 15 минут, первый платеж через 3 месяца",
    buttonText: "Рассчитать выгоду",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=1200&h=600",
    link: "/credit",
  },
  {
    badge: "Ограниченное предложение",
    title: "Тест-драйв в день обращения",
    subtitle: "Испытайте автомобиль в реальных условиях уже сегодня",
    buttonText: "Записаться на тест-драйв",
    image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&q=80&w=1200&h=600",
    link: "/test-drive",
  },
]

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTestDriveFormOpen, setIsTestDriveFormOpen] = useState(false)
  const router = useRouter()

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)
  }, [])

  const handleButtonClick = useCallback(
    (buttonText: string, link: string) => {
      if (buttonText === "Записаться на тест-драйв") {
        setIsTestDriveFormOpen(true)
      } else {
        router.push(link)
      }
    },
    [router],
  )

  return (
    <section className="relative h-[400px] sm:h-[500px] md:h-[600px] overflow-hidden">
      {SLIDES.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0">
            <Image
              src={slide.image || "/placeholder.svg"}
              alt={slide.title}
              layout="fill"
              objectFit="cover"
              priority={index === 0}
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
          </div>
          <div className="relative h-full max-w-[1300px] mx-auto px-4 py-8 md:py-12 flex flex-col justify-center">
            <Badge variant="secondary" className="w-fit mb-2 md:mb-4">
              {slide.badge}
            </Badge>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-2 md:mb-4 max-w-2xl">
              {slide.title}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-4 md:mb-8 max-w-2xl">{slide.subtitle}</p>
            <div className="flex flex-wrap gap-4">
              <Button
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto text-sm sm:text-base"
                onClick={() => handleButtonClick(slide.buttonText, slide.link)}
              >
                {slide.buttonText}
              </Button>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-1 md:p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        aria-label="Предыдущий слайд"
      >
        <ChevronLeft className="h-4 w-4 md:h-6 md:w-6 text-white" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-1 md:p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        aria-label="Следующий слайд"
      >
        <ChevronRight className="h-4 w-4 md:h-6 md:w-6 text-white" />
      </button>

      <RequestForm isOpen={isTestDriveFormOpen} onClose={() => setIsTestDriveFormOpen(false)} formType="test-drive" />
    </section>
  )
}

