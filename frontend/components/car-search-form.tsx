"use client"

import { useEffect, useState, useMemo, useCallback } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cars, type Car } from "@/data/cars"
import { Search } from "lucide-react"
import { fetchMarks, fetchModels, fetchBodyTypes, fetchGearboxes } from "@/src/utils/api"


type FilterOptions = {
  brand: string
  model: string
  maxPrice: string
  bodyType: string
  transmission: string
  drivetrain: string
}

export const CarSearchForm = () => {
  const [marks, setMarks] = useState<any[]>([])
  const [models, setModels] = useState<any[]>([])
  const [body_types, setBodyTypes] = useState<any[]>([])
  const [gearboxes, setGearboxes] = useState<any[]>([])

  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    brand: "",
    model: "",
    maxPrice: "",
    bodyType: "all",
    transmission: "all",
    drivetrain: "all",
  })
  const [filteredCars, setFilteredCars] = useState<Car[]>([])
  const router = useRouter()

  const uniqueBrands = useMemo(() => Array.from(new Set(cars.map((car) => car.brand))), [])
  const uniqueBodyTypes = useMemo(() => Array.from(new Set(cars.map((car) => car.bodyType))), [])
  const uniqueTransmissions = useMemo(() => Array.from(new Set(cars.map((car) => car.transmission))), [])

  const availableModels = useMemo(() => {
    if (!filterOptions.brand) return []
    return Array.from(new Set(cars.filter((car) => car.brand === filterOptions.brand).map((car) => car.model)))
  }, [filterOptions.brand])

  useEffect(() => {
    fetchMarks().then((res) => setMarks(res.marks))
    fetchBodyTypes().then((res) => setBodyTypes(res.body_types))
    fetchGearboxes().then((res) => setGearboxes(res.gearboxes))
  }, [])

  useEffect(() => {
    if (!filterOptions.brand) {
      setModels([])
      return
    }

    const selectedMark = marks.find((m) => m.name === filterOptions.brand)
    if (selectedMark) {
      fetchModels(selectedMark.id).then((res) => setModels(res.models))
    }

    const selectedBodyType = body_types.find((b) => b.name === filterOptions.bodyType)
    const selectedGearbox = gearboxes.find((g) => g.name === filterOptions.transmission)
  }, [filterOptions.brand, marks])

  const handleInputChange = useCallback((name: keyof FilterOptions, value: string) => {
    setFilterOptions((prev) => ({ ...prev, [name]: value }))
    if (name === "brand") {
      setFilterOptions((prev) => ({ ...prev, model: "" }))
    }
  }, [])

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      const filtered = cars.filter((car) => {
        if (filterOptions.brand && car.brand !== filterOptions.brand) return false
        if (filterOptions.model && car.model !== filterOptions.model) return false
        if (filterOptions.maxPrice && car.price > Number(filterOptions.maxPrice)) return false
        if (filterOptions.bodyType !== "all" && car.bodyType.toLowerCase() !== filterOptions.bodyType.toLowerCase())
          return false
        if (
          filterOptions.transmission !== "all" &&
          car.transmission.toLowerCase() !== filterOptions.transmission.toLowerCase()
        )
          return false
        if (
          filterOptions.drivetrain !== "all" &&
          car.drivetrain.toLowerCase() !== filterOptions.drivetrain.toLowerCase()
        )
          return false
        return true
      })
      setFilteredCars(filtered)
    },
    [filterOptions],
  )

  return (
    <section className="bg-white py-8 md:py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Найдите идеальный автомобиль</h2>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Параметры поиска</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Select onValueChange={(value) => handleInputChange("brand", value)} value={filterOptions.brand}>
                  <SelectTrigger>
                    <SelectValue placeholder="Марка" />
                  </SelectTrigger>
                  <SelectContent>
                    {marks.map((mark) => (
                      <SelectItem key={mark.id} value={mark.name}>{mark.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select onValueChange={(value) => handleInputChange("model", value)} value={filterOptions.model}>
                  <SelectTrigger>
                    <SelectValue placeholder="Модель" />
                  </SelectTrigger>
                  <SelectContent>
                    {models.map((model) => (
                      <SelectItem key={model.id} value={model.name}>{model.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  type="number"
                  placeholder="Максимальная цена"
                  value={filterOptions.maxPrice}
                  onChange={(e) => handleInputChange("maxPrice", e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Select onValueChange={(value) => handleInputChange("bodyType", value)} value={filterOptions.bodyType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Тип кузова" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все</SelectItem>
                    {body_types.map((body_type) => (
                      <SelectItem key={body_type.id} value={body_type.name}>{body_type.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  onValueChange={(value) => handleInputChange("transmission", value)}
                  value={filterOptions.transmission}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Тип КПП" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все</SelectItem>
                    {gearboxes.map((gearbox) => (
                      <SelectItem key={gearbox.id} value={gearbox.name}>{gearbox.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  onValueChange={(value) => handleInputChange("drivetrain", value)}
                  value={filterOptions.drivetrain}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Привод" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все</SelectItem>
                    <SelectItem value="fwd">Передний</SelectItem>
                    <SelectItem value="rwd">Задний</SelectItem>
                    <SelectItem value="awd">Полный</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full sm:w-auto">
                <Search className="mr-2 h-4 w-4" /> Найти автомобиль
              </Button>
            </form>
          </CardContent>
        </Card>

        {filteredCars.length > 0 && (
          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-4">Результаты поиска</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredCars.map((car) => (
                <Card key={car.id} className="flex flex-col h-full">
                  <CardHeader className="p-0">
                    <Image
                      src={car.image || "/placeholder.svg"}
                      alt={`${car.brand} ${car.model}`}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                  </CardHeader>
                  <CardContent className="flex-grow p-4">
                    <CardTitle className="text-lg font-semibold mb-2">
                      {car.brand} {car.model}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mb-2">Год: {car.year}</p>
                    <p className="font-bold text-lg mb-1">от {car.price.toLocaleString()} ₽</p>
                    <p className="text-sm text-muted-foreground">
                      В автокредит от {Math.round(car.price / 60).toLocaleString()} ₽/мес.
                    </p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Link href={`/catalog/${car.brand.toLowerCase()}/${car.model.toLowerCase()}`} className="w-full">
                      <Button variant="outline" className="w-full">
                        Подробнее
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

