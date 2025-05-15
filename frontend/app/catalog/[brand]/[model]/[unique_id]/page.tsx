"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { fetchCarById } from "@/src/utils/api"
import CarModelPage from "@/components/car-model-page"
import Loading from "@/components/loading"

export default function CarPage() {
  const params = useParams()
  const { unique_id } = params as { unique_id: string }

  const [car, setCar] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const data = await fetchCarById(unique_id)
        setCar(data.car)
      } catch (error) {
        console.error("Failed to fetch car:", error)
      } finally {
        setLoading(false)
      }
    }

    if (unique_id) {
      fetchCar()
    }
  }, [unique_id])

  if (loading) {
    return <Loading />
  }

  if (!car) {
    return <div>Car not found</div>
  }

  return (
    <CarModelPage
      brand={car.mark}
      model={car.model}
      price={car.price}
      discount={car.discount || 0}
      monthlyPayment={Math.round(car.price / 60)}
      images={car.images}
      specifications={{
        Двигатель: car.engine_type || "-",
        Мощность: `${car.engine_power || "-"} л.с.`,
        "Крутящий момент": `${car.engine?.torque || "-"} Нм`,
        "Коробка передач": car.gearbox || "-",
        Привод: car.drive_type || "-",
        "Тип топлива": car.engine_type || "-",
        "Расход топлива": `${car.engine_volume || "-"} л`,
        "Тип кузова": car.body_type || "-",
        Длина: `${car.dimensions?.length || "-"} мм`,
        Ширина: `${car.dimensions?.width || "-"} мм`,
        Высота: `${car.dimensions?.height || "-"} мм`,
        "Колесная база": `${car.dimensions?.wheelbase || "-"} мм`,
        "Дорожный просвет": `${car.dimensions?.groundClearance || "-"} мм`,
      }}
      features={{
        comfort: car.equipment_groups?.comfort
          ? Object.values(car.equipment_groups.comfort.values).map((item) => item.value)
          : [],
        safety: car.equipment_groups?.safety
          ? Object.values(car.equipment_groups.safety.values).map((item) => item.value)
          : [],
        multimedia: car.equipment_groups?.multimedia
          ? Object.values(car.equipment_groups.multimedia.values).map((item) => item.value)
          : [],
      }}
      configurations={car.configurations || []}
      configuration={car.complectation || "-"}
      colors={car.colors || []}
      color={car.color || "-"}
      otherModels={car.otherModels || []}
    />
  )
}
