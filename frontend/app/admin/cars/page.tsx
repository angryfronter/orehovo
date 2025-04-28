"use client"

import { useState, useEffect } from "react"
import { fetchCars } from "@/src/utils/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Trash2, Plus, X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

interface CarColor {
  name: string
  hex: string
  images: string[]
}

interface CarConfiguration {
  name: string
  price: number
  features: string[]
}

interface Car {
  id: number
  brand: string
  model: string
  year: number
  price: number
  engine: string
  transmission: string
  drivetrain: string
  fuelType: string
  bodyType: string
  description: string
  colors: CarColor[]
  configurations: CarConfiguration[]
  specifications: Record<string, string>
  gallery: string[]
}

export default function CarsManagement() {
  const [cars, setCars] = useState<Car[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [currentCar, setCurrentCar] = useState<Car | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    async function loadCars() {
      try {
        const data = await fetchCars()

        // Преобразуем ответ API в формат нужный фронту
        const mappedCars = data.cars.map((car: any) => ({
          id: car.id,
          brand: car.brand,
          model: car.model,
          year: car.year,
          price: car.price,
          engine: car.car_engines.length > 0 ? `${car.car_engines[0].displacement / 1000}L` : "",
          transmission: car.transmission,
          drivetrain: car.drivetrain,
          fuelType: car.fuel_type,
          bodyType: car.body_type,
          description: "", // Бэкенд пока description не возвращает
          colors: car.car_colors.map((color: any) => ({
            name: color.name,
            hex: color.hex,
            images: [], // Пока у цветов нет картинок
          })),
          configurations: car.car_configurations.map((config: any) => ({
            name: config.name,
            price: config.price,
            features: config.features,
          })),
          specifications: {
            // Тут можно подставить пустые данные или если появится на бэке — дописать
          },
          gallery: car.images.length ? car.images : [car.image], // Используем main image если нет галереи
        }))

        setCars(mappedCars)
      } catch (err: any) {
        console.error(err)
        setError(err.message || "Ошибка загрузки данных")
      } finally {
        setIsLoading(false)
      }
    }

    loadCars()
  }, [])

  if (isLoading) {
    return <div>Загрузка автомобилей...</div>
  }

  if (error) {
    return <div>Ошибка: {error}</div>
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof Car) => {
    if (currentCar) {
      setCurrentCar({ ...currentCar, [field]: e.target.value })
    }
  }

  const handleColorChange = (index: number, field: keyof CarColor, value: string) => {
    if (currentCar) {
      const newColors = [...currentCar.colors]
      newColors[index] = { ...newColors[index], [field]: value }
      setCurrentCar({ ...currentCar, colors: newColors })
    }
  }

  const handleConfigurationChange = (index: number, field: keyof CarConfiguration, value: string | number) => {
    if (currentCar) {
      const newConfigurations = [...currentCar.configurations]
      newConfigurations[index] = { ...newConfigurations[index], [field]: value }
      setCurrentCar({ ...currentCar, configurations: newConfigurations })
    }
  }

  const handleSpecificationChange = (key: string, value: string) => {
    if (currentCar) {
      setCurrentCar({ ...currentCar, specifications: { ...currentCar.specifications, [key]: value } })
    }
  }

  const handleAddCar = () => {
    if (currentCar) {
      if (isEditing) {
        setCars(cars.map((car) => (car.id === currentCar.id ? currentCar : car)))
      } else {
        setCars([...cars, { ...currentCar, id: Date.now() }])
      }
      setIsDialogOpen(false)
      setCurrentCar(null)
      setIsEditing(false)
    }
  }

  const handleEditCar = (car: Car) => {
    setCurrentCar(car)
    setIsEditing(true)
    setIsDialogOpen(true)
  }

  const handleDeleteCar = (id: number) => {
    setCars(cars.filter((car) => car.id !== id))
  }

  const handleAddColor = () => {
    if (currentCar) {
      setCurrentCar({
        ...currentCar,
        colors: [...currentCar.colors, { name: "", hex: "", images: [] }],
      })
    }
  }

  const handleAddConfiguration = () => {
    if (currentCar) {
      setCurrentCar({
        ...currentCar,
        configurations: [...currentCar.configurations, { name: "", price: 0, features: [] }],
      })
    }
  }

  const handleAddSpecification = () => {
    if (currentCar) {
      setCurrentCar({
        ...currentCar,
        specifications: { ...currentCar.specifications, "": "" },
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Управление автомобилями</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setCurrentCar(null)
                setIsEditing(false)
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Добавить автомобиль
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{isEditing ? "Редактировать автомобиль" : "Добавить новый автомобиль"}</DialogTitle>
            </DialogHeader>
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="general">Общее</TabsTrigger>
                <TabsTrigger value="colors">Цвета</TabsTrigger>
                <TabsTrigger value="configurations">Комплектации</TabsTrigger>
                <TabsTrigger value="specifications">Характеристики</TabsTrigger>
                <TabsTrigger value="gallery">Галерея</TabsTrigger>
              </TabsList>
              <TabsContent value="general" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="brand">Марка</Label>
                    <Input id="brand" value={currentCar?.brand || ""} onChange={(e) => handleInputChange(e, "brand")} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="model">Модель</Label>
                    <Input id="model" value={currentCar?.model || ""} onChange={(e) => handleInputChange(e, "model")} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="year">Год</Label>
                    <Input
                      id="year"
                      type="number"
                      value={currentCar?.year || ""}
                      onChange={(e) => handleInputChange(e, "year")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Цена</Label>
                    <Input
                      id="price"
                      type="number"
                      value={currentCar?.price || ""}
                      onChange={(e) => handleInputChange(e, "price")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="engine">Двигатель</Label>
                    <Input
                      id="engine"
                      value={currentCar?.engine || ""}
                      onChange={(e) => handleInputChange(e, "engine")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="transmission">Трансмиссия</Label>
                    <Input
                      id="transmission"
                      value={currentCar?.transmission || ""}
                      onChange={(e) => handleInputChange(e, "transmission")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="drivetrain">Привод</Label>
                    <Input
                      id="drivetrain"
                      value={currentCar?.drivetrain || ""}
                      onChange={(e) => handleInputChange(e, "drivetrain")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fuelType">Тип топлива</Label>
                    <Input
                      id="fuelType"
                      value={currentCar?.fuelType || ""}
                      onChange={(e) => handleInputChange(e, "fuelType")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bodyType">Тип кузова</Label>
                    <Input
                      id="bodyType"
                      value={currentCar?.bodyType || ""}
                      onChange={(e) => handleInputChange(e, "bodyType")}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Описание</Label>
                  <Textarea
                    id="description"
                    value={currentCar?.description || ""}
                    onChange={(e) => handleInputChange(e, "description")}
                  />
                </div>
              </TabsContent>
              <TabsContent value="colors" className="space-y-4">
                {currentCar?.colors.map((color, index) => (
                  <div key={index} className="space-y-2 border p-4 rounded-md">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Цвет {index + 1}</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          if (currentCar) {
                            const newColors = currentCar.colors.filter((_, i) => i !== index)
                            setCurrentCar({ ...currentCar, colors: newColors })
                          }
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`colorName${index}`}>Название цвета</Label>
                        <Input
                          id={`colorName${index}`}
                          value={color.name}
                          onChange={(e) => handleColorChange(index, "name", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`colorHex${index}`}>Код цвета (HEX)</Label>
                        <Input
                          id={`colorHex${index}`}
                          value={color.hex}
                          onChange={(e) => handleColorChange(index, "hex", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Изображения</Label>
                      <div className="flex flex-wrap gap-2">
                        {color.images.map((image, imageIndex) => (
                          <div key={imageIndex} className="relative">
                            <Image
                              src={image || "/placeholder.svg"}
                              alt={`Color ${color.name}`}
                              width={100}
                              height={100}
                              className="rounded-md"
                            />
                            <Button
                              variant="destructive"
                              size="icon"
                              className="absolute top-0 right-0"
                              onClick={() => {
                                if (currentCar) {
                                  const newColors = [...currentCar.colors]
                                  newColors[index].images = newColors[index].images.filter((_, i) => i !== imageIndex)
                                  setCurrentCar({ ...currentCar, colors: newColors })
                                }
                              }}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          onClick={() => {
                            if (currentCar) {
                              const newColors = [...currentCar.colors]
                              newColors[index].images.push("/placeholder.svg")
                              setCurrentCar({ ...currentCar, colors: newColors })
                            }
                          }}
                        >
                          Добавить изображение
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                <Button onClick={handleAddColor}>Добавить цвет</Button>
              </TabsContent>
              <TabsContent value="configurations" className="space-y-4">
                {currentCar?.configurations.map((config, index) => (
                  <div key={index} className="space-y-2 border p-4 rounded-md">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Комплектация {index + 1}</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          if (currentCar) {
                            const newConfigurations = currentCar.configurations.filter((_, i) => i !== index)
                            setCurrentCar({ ...currentCar, configurations: newConfigurations })
                          }
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`configName${index}`}>Название комплектации</Label>
                        <Input
                          id={`configName${index}`}
                          value={config.name}
                          onChange={(e) => handleConfigurationChange(index, "name", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`configPrice${index}`}>Цена</Label>
                        <Input
                          id={`configPrice${index}`}
                          type="number"
                          value={config.price}
                          onChange={(e) => handleConfigurationChange(index, "price", Number(e.target.value))}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Особенности</Label>
                      <Textarea
                        value={config.features.join("\n")}
                        onChange={(e) => handleConfigurationChange(index, "features", e.target.value.split("\n"))}
                        placeholder="Введите особенности, каждую с новой строки"
                      />
                    </div>
                  </div>
                ))}
                <Button onClick={handleAddConfiguration}>Добавить комплектацию</Button>
              </TabsContent>
              <TabsContent value="specifications" className="space-y-4">
                {Object.entries(currentCar?.specifications || {}).map(([key, value], index) => (
                  <div key={index} className="grid grid-cols-2 gap-4">
                    <Input
                      value={key}
                      onChange={(e) => {
                        if (currentCar) {
                          const newSpecs = { ...currentCar.specifications }
                          delete newSpecs[key]
                          newSpecs[e.target.value] = value
                          setCurrentCar({ ...currentCar, specifications: newSpecs })
                        }
                      }}
                      placeholder="Характеристика"
                    />
                    <Input
                      value={value}
                      onChange={(e) => handleSpecificationChange(key, e.target.value)}
                      placeholder="Значение"
                    />
                  </div>
                ))}
                <Button onClick={handleAddSpecification}>Добавить характеристику</Button>
              </TabsContent>
              <TabsContent value="gallery" className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {currentCar?.gallery.map((image, index) => (
                    <div key={index} className="relative">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`Gallery image ${index + 1}`}
                        width={100}
                        height={100}
                        className="rounded-md"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-0 right-0"
                        onClick={() => {
                          if (currentCar) {
                            const newGallery = currentCar.gallery.filter((_, i) => i !== index)
                            setCurrentCar({ ...currentCar, gallery: newGallery })
                          }
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    onClick={() => {
                      if (currentCar) {
                        setCurrentCar({ ...currentCar, gallery: [...currentCar.gallery, "/placeholder.svg"] })
                      }
                    }}
                  >
                    Добавить изображение
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Отмена
              </Button>
              <Button onClick={handleAddCar}>{isEditing ? "Сохранить изменения" : "Добавить автомобиль"}</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Марка</TableHead>
            <TableHead>Модель</TableHead>
            <TableHead>Год</TableHead>
            <TableHead>Цена</TableHead>
            <TableHead>Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cars.map((car) => (
            <TableRow key={car.id}>
              <TableCell>{car.brand}</TableCell>
              <TableCell>{car.model}</TableCell>
              <TableCell>{car.year}</TableCell>
              <TableCell>{car.price.toLocaleString()} ₽</TableCell>
              <TableCell>
                <Button variant="ghost" size="icon" onClick={() => handleEditCar(car)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDeleteCar(car.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

