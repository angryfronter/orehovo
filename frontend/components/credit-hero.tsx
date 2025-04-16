"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { RequestForm } from "@/components/request-form"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export default function CreditHero() {
  const [isFormOpen, setIsFormOpen] = useState(false)

  return (
    <section className="relative h-[600px] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1200&h=600"
          alt="Автокредит"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
      </div>

      <div className="relative h-full max-w-[1300px] mx-auto px-4 py-12 flex flex-col justify-center">
        <Badge variant="secondary" className="w-fit mb-4">
          Ограниченное предложение
        </Badge>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 max-w-2xl">
          Выгодный автокредит на особых условиях
        </h1>
        <p className="text-xl text-white/90 mb-8 max-w-2xl">
          Получите одобрение автокредита за 30 минут с минимальной ставкой от 4.9% годовых. Первоначальный взнос от 0%
        </p>
        <div className="flex flex-wrap gap-4">
          <Button variant="secondary" size="lg" onClick={() => setIsFormOpen(true)}>
            Рассчитать кредит
          </Button>
          <Link href="/catalog">
            <Button variant="secondary" size="lg" className="bg-white text-black hover:bg-white/90" asChild>
              <span>
                Выбрать автомобиль
                <ArrowRight className="ml-2 h-4 w-4" />
              </span>
            </Button>
          </Link>
        </div>
      </div>

      <RequestForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} formType="credit" />
    </section>
  )
}

