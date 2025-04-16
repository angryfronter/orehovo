import type React from "react"
import Head from "next/head"
import type { Car } from "@/types/car"

interface CarDetailsProps {
  car: Car
}

export const CarDetails: React.FC<CarDetailsProps> = ({ car }) => {
  return (
    <>
      <Head>
        <title>
          {car.brand} {car.model} | Наш автосалон
        </title>
        <meta name="description" content={`Подробная информация о ${car.brand} ${car.model}`} />
      </Head>
      <article>
        <h1>
          {car.brand} {car.model}
        </h1>
        <img src={car.image || "/placeholder.svg"} alt={`${car.brand} ${car.model}`} />
        <p>Цена: {car.price}</p>
        <ul aria-label="Характеристики автомобиля">
          <li>Двигатель: {car.engine}</li>
          <li>Трансмиссия: {car.transmission}</li>
        </ul>
      </article>
    </>
  )
}

