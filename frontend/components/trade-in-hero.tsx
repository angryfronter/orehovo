import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import Link from "next/link"
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'

export default function TradeInHero() {
  return (
    <section className="relative h-[600px] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1551522435-a13afa10f103?auto=format&fit=crop&q=80&w=1200&h=600"
          alt="Trade-in"
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
          Обменяйте свой автомобиль на новый
        </h1>
        <p className="text-xl text-white/90 mb-8 max-w-2xl">
          Получите максимальную выгоду до 100 000 рублей при обмене вашего автомобиля на новый в ДЦ Орехово
        </p>
        <Link href="/trade-in/calculator">
          <Button variant="secondary" size="lg" asChild>
            <span>
              Рассчитать стоимость обмена
              <ArrowRight className="ml-2 h-5 w-5" />
            </span>
          </Button>
        </Link>
      </div>
    </section>
  )
}

