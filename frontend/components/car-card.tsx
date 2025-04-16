import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Car } from '@/data/cars'

export default function CarCard({ id, brand, model, price, image }: Car) {
  return (
    <Card className="overflow-hidden">
      <Link href={`/catalog/${brand.toLowerCase()}/${model.toLowerCase()}`}>
        <div className="relative h-48">
          <Image
            src={image}
            alt={`${brand} ${model}`}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-2">{brand} {model}</h3>
          <p className="text-2xl font-bold text-primary">от {price.toLocaleString()} ₽</p>
        </CardContent>
      </Link>
      <CardFooter className="p-4">
        <Link href={`/catalog/${brand.toLowerCase()}/${model.toLowerCase()}`} className="w-full">
          <Button variant="outline" className="w-full">Подробнее</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

