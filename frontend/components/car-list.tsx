'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Zap } from 'lucide-react'

// Пример данных автомобилей (в реальном приложении это должно приходить с сервера)
const cars = [
  { id: 1, brand: 'Toyota', model: 'Camry', price: 2500000, image: '/placeholder.svg?height=200&width=300', isNew: true },
  { id: 2, brand: 'Honda', model: 'Civic', price: 2200000, image: '/placeholder.svg?height=200&width=300', isNew: false },
  { id: 3, brand: 'Ford', model: 'Focus', price: 1800000, image: '/placeholder.svg?height=200&width=300', isNew: true },
  { id: 4, brand: 'Mazda', model: 'CX-5', price: 2700000, image: '/placeholder.svg?height=200&width=300', isNew: false },
  { id: 5, brand: 'Volkswagen', model: 'Tiguan', price: 2900000, image: '/placeholder.svg?height=200&width=300', isNew: true },
  { id: 6, brand: 'Kia', model: 'Rio', price: 1600000, image: '/placeholder.svg?height=200&width=300', isNew: false },
]

export default function CarList() {
  const [visibleCars, setVisibleCars] = useState(4)

  const loadMore = () => {
    setVisibleCars(prevVisible => prevVisible + 4)
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cars.slice(0, visibleCars).map(car => (
          <Card key={car.id} className="overflow-hidden">
            <CardHeader className="p-0">
              <div className="relative">
                <Image
                  src={car.image}
                  alt={`${car.brand} ${car.model}`}
                  width={300}
                  height={200}
                  layout="responsive"
                />
                {car.isNew && (
                  <Badge className="absolute top-2 right-2 bg-primary">Новинка</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-xl mb-2">{car.brand} {car.model}</CardTitle>
              <p className="text-2xl font-bold text-primary">{car.price.toLocaleString()} ₽</p>
              <p className="text-sm text-muted-foreground">
                От {Math.round(car.price / 60).toLocaleString()} ₽/мес
              </p>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between items-center">
              <Button variant="outline">
                Подробнее
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="secondary">
                Быстрый заказ
                <Zap className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {visibleCars < cars.length && (
        <div className="text-center">
          <Button onClick={loadMore} variant="outline" size="lg">
            Показать еще
          </Button>
        </div>
      )}
    </div>
  )
}

