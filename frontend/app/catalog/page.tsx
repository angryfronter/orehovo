"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { cars, type Car } from "@/data/cars"
import BrandSelector from "@/components/brand-selector"
import CatalogFilters from "@/components/catalog-filters"
import Promotions from "@/components/promotions"
import AssistanceForm from "@/components/assistance-form"
import Loading from "@/components/loading"
import { fetchCars } from "@/src/utils/api"

interface Model {
  brand: string
  name: string
  image: string
  availableCount: number
  price: number
  monthlyPayment: number
}

interface GroupedModels {
  [key: string]: Model[]
}

export default function CatalogPage() {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null)
  const [filteredCars, setFilteredCars] = useState<Car[]>(cars)
  const [groupedModels, setGroupedModels] = useState<GroupedModels>({})
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({
    body_type: "all",
    gearbox: "all",
    drive: "all",
    minPrice: "",
    maxPrice: "",
  })

  useEffect(() => {
    const fetchModels = async () => {
      setLoading(true)
      try {
        const { cars } = await fetchCars()

        const filtered = cars.filter((car: Car) => {
          if (selectedBrand && car.brand.toLowerCase() !== selectedBrand.toLowerCase()) {
            return false
          }
          if (filters.body_type !== "all" && car.bodyType.toLowerCase() !== filters.body_type.toLowerCase()) {
            return false
          }
          if (filters.gearbox !== "all" && car.transmission.toLowerCase() !== filters.gearbox.toLowerCase()) {
            return false
          }
          if (filters.drive !== "all" && car.drivetrain.toLowerCase() !== filters.drive.toLowerCase()) {
            return false
          }
          if (filters.minPrice && car.price < Number.parseInt(filters.minPrice)) {
            return false
          }
          if (filters.maxPrice && car.price > Number.parseInt(filters.maxPrice)) {
            return false
          }
          return true
        })
        setFilteredCars(filtered)

        const grouped: GroupedModels = {}
        filtered.forEach((car) => {
          if (!grouped[car.brand]) {
            grouped[car.brand] = []
          }
          grouped[car.brand].push({
            brand: car.brand,
            name: car.model,
            image: car.image,
            availableCount: Math.floor(Math.random() * 10) + 1,
            price: car.price,
            monthlyPayment: Math.round(car.price / 60),
          })
        })
        setGroupedModels(grouped)
      } catch (error) {
        console.error("Error fetching models:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchModels()
  }, [selectedBrand, filters])

  const handleSelectBrand = (brandId: string | null) => {
    setSelectedBrand(brandId)
    setFilters({
      body_type: "all",
      gearbox: "all",
      drive: "all",
      minPrice: "",
      maxPrice: "",
    })
  }

  const handleFilterChange = (name: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Каталог автомобилей</h1>

      <BrandSelector selectedBrand={selectedBrand} onSelectBrand={handleSelectBrand} />

      <div className="my-8">
        <CatalogFilters onChange={handleFilterChange} />
      </div>

      {loading ? (
        <Loading />
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedModels).map(([brand, models]) => (
            <div key={brand}>
              <h2 className="text-2xl font-bold mb-4">{brand}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {models.map((model) => (
                  <Card key={`${model.brand}-${model.name}`} className="flex flex-col">
                    <CardHeader className="p-0">
                      <Image
                        src={model.image || "/placeholder.svg"}
                        alt={`${model.brand} ${model.name}`}
                        width={400}
                        height={300}
                        className="w-full h-64 object-cover rounded-t-lg"
                      />
                    </CardHeader>
                    <CardContent className="flex-grow p-4">
                      <h3 className="text-lg font-semibold mb-2">{model.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{model.availableCount} авто в наличии</p>
                      <p className="font-bold text-lg mb-1">от {model.price.toLocaleString()} ₽</p>
                      <p className="text-sm text-muted-foreground">
                        В кредит от {model.monthlyPayment.toLocaleString()} ₽/мес.
                      </p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Link
                        href={`/catalog/${model.brand.toLowerCase()}/${model.name.toLowerCase()}`}
                        className="w-full"
                      >
                        <Button variant="outline" className="w-full">
                          Подробнее
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <Promotions />
      <AssistanceForm />
    </div>
  )
}

