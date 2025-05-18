"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
// import { cars, type Car } from "@/data/cars"
import BrandSelector from "@/components/brand-selector"
import CatalogFilters from "@/components/catalog-filters"
import Promotions from "@/components/promotions"
import AssistanceForm from "@/components/assistance-form"
import Loading from "@/components/loading"
import { fetchvisibleCars } from "@/src/utils/api"
import { slugify } from "@/src/utils/slugify"

interface Car {
  id: string
  unique_id: string
  mark: {id: string, name: string}
  model: {id: string, name: string}
  images: string[]
  price: number
  body_type: string
  gearbox: string
  drive_type: string
}

interface GroupedCars {
  [key: string]: Car[]
}

export default function CatalogPage() {
  const [selectedMark, setSelectedMark] = useState<string | null>(null)
  const [filteredCars, setFilteredCars] = useState<Car[]>([])
  const [groupedCars, setGroupedCars] = useState<GroupedCars>({})
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({
    body_type: "all",
    gearbox: "all",
    drive_type: "all",
    minPrice: "",
    maxPrice: "",
  })

  useEffect(() => {
    const fetchModels = async () => {
      setLoading(true)
      try {
        const { cars }: { cars: Car[] } = await fetchvisibleCars()

        const filtered = cars.filter((car: Car) => {
          if (selectedMark && car.mark.id !== selectedMark) {
            return false
          }
          if (filters.body_type !== "all" && car.body_type  !== filters.body_type ) {
            return false
          }
          if (filters.gearbox !== "all" && car.gearbox  !== filters.gearbox ) {
            return false
          }
          if (filters.drive_type !== "all" && car.drive_type  !== filters.drive_type ) {
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

        const grouped: GroupedCars = {}
        filtered.forEach((car) => {
          const markId = car.mark.id
          if (!grouped[markId]) {
            grouped[markId] = []
          }
          grouped[markId].push(car)
        })
        setGroupedCars(grouped)
      } catch (error) {
        console.error("Error fetching cars:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchModels()
  }, [selectedMark, filters])

  const handleSelectMark = (markId: string | null) => {
    setSelectedMark(markId)
    setFilters({
      body_type: "all",
      gearbox: "all",
      drive_type: "all",
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

      <BrandSelector selectedBrand={selectedMark} onSelectBrand={handleSelectMark} />

      <div className="my-8">
        <CatalogFilters onChange={handleFilterChange} />
      </div>

      {loading ? (
        <Loading />
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedCars).map(([markId, cars]) => (
            <div key={markId}>
              <h2 className="text-2xl font-bold mb-4">{cars[0].mark.name}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cars.map((car) => (
                  <Card key={`${car.mark.name}-${car.model.name}`} className="flex flex-col">
                    <CardHeader className="p-0">
                      <Image
                        src={car.images?.[0] || "/placeholder.svg"}
                        alt={`${car.mark.name} ${car.model.name}`}
                        width={400}
                        height={300}
                        className="w-full h-64 object-cover rounded-t-lg"
                      />
                    </CardHeader>
                    <CardContent className="flex-grow p-4">
                      <h3 className="text-lg font-semibold mb-2">{car.model.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{car.availableCount} авто в наличии</p>
                      <p className="font-bold text-lg mb-1">от {car.price.toLocaleString()} ₽</p>
                      <p className="text-sm text-muted-foreground">
                        В кредит от {Math.round(car.price / 60).toLocaleString()} ₽/мес.
                      </p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Link
                        href={`/catalog/${slugify(car.mark?.name) ?? 'defaultMark'}/${slugify(car.model?.name) ?? 'defaultModel'}/${car.id}`}
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

