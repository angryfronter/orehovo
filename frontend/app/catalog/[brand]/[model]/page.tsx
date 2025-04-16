import CarModelPage from "@/components/car-model-page"
import { cars } from "@/data/cars"

export default function CarPage({ params }: { params: { brand: string; model: string } }) {
  const car = cars.find(
    (c) => c.brand.toLowerCase() === params.brand && c.model.toLowerCase() === params.model.replace(/%20/g, " "),
  )

  if (!car) {
    return <div>Car not found</div>
  }

  return (
    <CarModelPage
      brand={car.brand}
      model={car.model}
      price={car.price}
      discount={car.discount || 0}
      monthlyPayment={Math.round(car.price / 60)}
      images={car.images || { [car.color]: [car.image] }}
      specifications={{
        Двигатель: car.engine.type,
        Мощность: `${car.engine.power} л.с.`,
        "Крутящий момент": `${car.engine.torque} Нм`,
        "Коробка передач": car.transmission,
        Привод: car.drivetrain,
        "Тип топлива": car.fuelType,
        "Расход топлива": `${car.fuelTank} л`,
        "Тип кузова": car.bodyType,
        Длина: `${car.dimensions?.length} мм`,
        Ширина: `${car.dimensions?.width} мм`,
        Высота: `${car.dimensions?.height} мм`,
        "Колесная база": `${car.dimensions?.wheelbase} мм`,
        "Дорожный просвет": `${car.dimensions?.groundClearance} мм`,
      }}
      features={{
        comfort: car.features?.comfort || [],
        safety: car.features?.safety || [],
        multimedia: car.features?.multimedia || [],
      }}
      configurations={car.configurations || []}
      colors={car.colors || []}
      otherModels={cars.filter((c) => c.brand === car.brand && c.model !== car.model)}
    />
  )
}

