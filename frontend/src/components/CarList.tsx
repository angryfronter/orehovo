"use client"

import React, { useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import type { Car } from "@/types"
import { sortCarsByPrice } from "@/utils/sortCars"
import styles from "./CarList.module.css"

interface CarListProps {
  cars: Car[]
}

export const CarList: React.FC<CarListProps> = React.memo(({ cars }) => {
  const sortedCars = useCallback(() => sortCarsByPrice(cars), [cars])

  return (
    <div className={styles.carGrid}>
      {sortedCars().map((car) => (
        <Link key={car.id} href={`/cars/${car.id}`} className={styles.carLink}>
          <div className={styles.carCard}>
            <div className={styles.imageWrapper}>
              <Image
                src={car.image || "/placeholder.svg"}
                alt={`${car.brand} ${car.model}`}
                width={300}
                height={200}
                layout="responsive"
                objectFit="cover"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg"
                }}
              />
            </div>
            <div className={styles.carInfo}>
              <h2 className={styles.carTitle}>
                {car.brand} {car.model}
              </h2>
              <p className={styles.carYear}>Год: {car.year}</p>
              <p className={styles.carPrice}>от {car.price.toLocaleString()} ₽</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
})

CarList.displayName = "CarList"

