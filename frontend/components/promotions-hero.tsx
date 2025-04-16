import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link';
import Image from 'next/image'

export default function PromotionsHero() {
  return (
    <section className="relative h-[600px] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=1200&h=600"
          alt="Акции"
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
          Эксклюзивные акции и предложения
        </h1>
        <p className="text-xl text-white/90 mb-8 max-w-2xl">
          Откройте для себя непревзойденные возможности и выгодные предложения на премиальные автомобили в ДЦ Орехово.
        </p>
        <Link href="/promotions">
          <Button variant="secondary" size="lg" className="w-fit" asChild>
            <span>
              Смотреть все акции
              <ArrowRight className="ml-2 h-5 w-5" />
            </span>
          </Button>
        </Link>
      </div>
    </section>
  )
}

