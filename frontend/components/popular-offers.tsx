import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { cars } from '@/data/cars'
import { Badge } from '@/components/ui/badge'
import { Percent, Gift, CreditCard } from 'lucide-react'

export default function PopularOffers() {
  // Select the first three cars from the catalog
  const popularCars = cars.slice(0, 3)

  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">Горячие предложения</h2>
        <p className="text-center text-gray-600 mb-8">Успейте приобрести популярные модели по выгодным ценам</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-0">
          {popularCars.map((car) => (
            <Card key={car.id} className="flex flex-col overflow-hidden">
              <CardHeader className="p-0 relative">
                <Image
                  src={car.image}
                  alt={`${car.brand} ${car.model}`}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <Badge className="absolute top-2 right-2 bg-red-500">Хит продаж</Badge>
              </CardHeader>
              <CardContent className="flex-grow p-4">
                <CardTitle className="text-lg font-semibold mb-2">{car.brand} {car.model}</CardTitle>
                <p className="text-gray-600 mb-2">Год: {car.year}</p>
                <p className="font-bold text-lg mb-1">от {car.price.toLocaleString()} ₽</p>
                <p className="text-sm text-muted-foreground mb-4">
                  В кредит от {Math.round(car.price / 60).toLocaleString()} ₽/мес.
                </p>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center">
                    <Percent className="w-4 h-4 mr-2 text-green-500" />
                    <span className="text-sm">Скидка до 20%</span>
                  </div>
                  <div className="flex items-center">
                    <Gift className="w-4 h-4 mr-2 text-blue-500" />
                    <span className="text-sm">Подарок при покупке</span>
                  </div>
                  <div className="flex items-center">
                    <CreditCard className="w-4 h-4 mr-2 text-yellow-500" />
                    <span className="text-sm">Выгодный кредит</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 bg-gray-50">
                <Link 
                  href={`/catalog/${car.brand.toLowerCase()}/${car.model.toLowerCase()}`}
                  className="w-full"
                >
                  <Button variant="outline" className="w-full">Подробнее</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button size="lg">Посмотреть все предложения</Button>
        </div>
      </div>
    </section>
  )
}

