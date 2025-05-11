import { fetchCars } from "@/src/utils/api"
import CarModelPage from "@/components/car-model-page"

interface Props {
  params: { brand: string; model: string }
}

export default async function CarPage({ params }: Props) {
const { cars } = await fetchCars()

const normalizedBrand = params.brand.toLowerCase()
const normalizedModel = params.model.toLowerCase().replace(/%20/g, " ")

const car = cars.find(
  (c) =>
  typeof c.mark === "string" &&
  typeof c.model === "string" &&
  c.mark.toLowerCase() === normalizedBrand &&
  c.model.toLowerCase() === normalizedModel
)

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
        Двигатель: car.engine?.type || "",
        Мощность: `${car.engine?.power || ""} л.с.`,
        "Крутящий момент": `${car.engine?.torque || ""} Нм`,
        "Коробка передач": car.transmission || "",
        Привод: car.drivetrain || "",
        "Тип топлива": car.fuelType || "",
        "Расход топлива": `${car.fuelTank || ""} л`,
        "Тип кузова": car.bodyType || "",
        Длина: `${car.dimensions?.length || ""} мм`,
        Ширина: `${car.dimensions?.width || ""} мм`,
        Высота: `${car.dimensions?.height || ""} мм`,
        "Колесная база": `${car.dimensions?.wheelbase || ""} мм`,
        "Дорожный просвет": `${car.dimensions?.groundClearance || ""} мм`,
      }}
      features={{
      comfort: car.features?.comfort || [],
      safety: car.features?.safety || [],
      multimedia: car.features?.multimedia || [],
      }}
      configurations={car.configurations || []}
      colors={car.colors || []}
      otherModels={cars.filter(
      (c) => c.mark === car.mark && c.model !== car.model
      )}
    />
  )
}