import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { cars } from '@/data/cars'
import Link from 'next/link';

export default function CarPage({ params }: { params: { brand: string } }) {
  const brandCars = cars.filter(c => c.brand.toLowerCase() === params.brand.toLowerCase())

  if (!brandCars.length) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{params.brand} Models</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {brandCars.map((car) => (
          <div key={car.id} className="border rounded-lg overflow-hidden shadow-lg">
            <Image
              src={car.image}
              alt={`${car.brand} ${car.model}`}
              width={400}
              height={300}
              layout="responsive"
              objectFit="cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{car.model}</h2>
              <p className="text-gray-600 mb-2">Год выпуска: {car.year}</p>
              <p className="text-lg font-bold mb-4">от {car.price.toLocaleString()} ₽</p>
              <Link href={`/catalog/${params.brand.toLowerCase()}/${car.model.toLowerCase()}`}>
                <Button className="w-full">Подробнее</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

