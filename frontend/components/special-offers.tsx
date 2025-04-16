import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { cars } from '@/data/cars'

export default function SpecialOffers() {
  // Select featured cars from the catalog with special offers
  const specialOffers = [
    {
      car: cars.find(car => car.brand === "CHERY" && car.model === "Tiggo 7 Pro Max"),
      description: "Выгода до 300 000 ₽"
    },
    {
      car: cars.find(car => car.brand === "EXEED" && car.model === "TXL"),
      description: "Кредит от 3.9%"
    },
    {
      car: cars.find(car => car.brand === "HAVAL" && car.model === "Jolion"),
      description: "Trade-in бонус 150 000 ₽"
    }
  ].filter(offer => offer.car) // Filter out any undefined cars

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Специальные предложения</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {specialOffers.map((offer, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="p-0">
                <div className="relative">
                  <Image 
                    src={offer.car!.image} 
                    alt={`${offer.car!.brand} ${offer.car!.model}`} 
                    width={300} 
                    height={200} 
                    layout="responsive"
                  />
                  <Badge className="absolute top-2 right-2 bg-primary">
                    Специальное предложение
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-xl mb-2">
                  {offer.car!.brand} {offer.car!.model}
                </CardTitle>
                <p className="text-sm text-muted-foreground mb-2">
                  {offer.description}
                </p>
                <p className="text-2xl font-bold text-primary">
                  {offer.car!.price.toLocaleString()} ₽
                </p>
                <p className="text-sm text-muted-foreground">
                  От {Math.round(offer.car!.price / 60).toLocaleString()} ₽/мес
                </p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Link 
                  href={`/catalog/${offer.car!.brand.toLowerCase()}/${offer.car!.model.toLowerCase()}`}
                  className="w-full"
                >
                  <Button className="w-full">
                    Подробнее
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

