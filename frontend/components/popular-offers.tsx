'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Percent, Gift, CreditCard } from 'lucide-react'
import { fetchhotvisibleCars } from '@/src/utils/api'
import { slugify } from "@/src/utils/slugify"

export default function PopularOffers() {
  const [cars, setCars] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchhotvisibleCars()
      .then((data) => setCars(data.cars.slice(0, 3))) // показываем только первые 3
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">Горячие предложения</h2>
        <p className="text-center text-gray-600 mb-8">
          Успейте приобрести популярные модели по выгодным ценам
        </p>

        {loading ? (
          <p className="text-center">Загрузка...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : cars.length === 0 ? (
          <p className="text-center text-gray-500">Нет горячих предложений</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-0">
            {cars.map((car) => (
              <Card key={car.id} className="flex flex-col overflow-hidden">
                <CardHeader className="p-0 relative">
                  <Image
                    src={car.images?.[0] || '/placeholder.jpg'}
                    alt={`${car.mark?.name || ''} ${car.model?.name || ''}`}
                    width={300}
                    height={200}
                    className="w-full h-49 object-cover"
                  />
                  <Badge className="absolute top-2 right-2 bg-red-500">Хит продаж</Badge>
                </CardHeader>
                <CardContent className="flex-grow p-4">
                  <CardTitle className="text-lg font-semibold mb-2">
                    {car.mark?.name} {car.model?.name}
                  </CardTitle>
                  <p className="text-gray-600 mb-2">Год: {car.year}</p>
                  <p className="font-bold text-lg mb-1">
                    от {car.price?.toLocaleString()} ₽
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    В кредит от {(car.price && Math.round(car.price / 60)).toLocaleString()} ₽/мес.
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
                    href={`/catalog/${slugify(car.mark?.name) ?? 'defaultMark'}/${slugify(car.model?.name) ?? 'defaultModel'}/${car.id}`}
                    className="w-full"
                  >
                    <Button variant="outline" className="w-full">Подробнее</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center mt-8">
          <Link
            href={`/catalog`}
            className="w-full"
          >
            <Button size="lg">Посмотреть все предложения</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
