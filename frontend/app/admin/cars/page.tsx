"use client"

import { useState, useEffect } from "react"
import { fetchCars, deleteCar, updateCar } from "@/src/utils/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Trash2, Plus, X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { Switch } from "@/components/ui/switch"
import { EyeOff, Flame } from "lucide-react"

interface Car {
  id: number
  external_id: number
  unique_id: string
  offer_type: string
  mark: string
  model: string
  generation: string
  modification: string
  modification_auto_ru_xml_id: string
  complectation: string
  body_type: string
  category: string
  car_type: string
  section: string
  dealer_id: number
  dealer_name: string
  dealer_description: string
  engine_power: number
  engine_power_kwh: number
  engine_volume: number
  engine_type: string
  gearbox: string
  drive_type: string
  color: string
  is_metallic: boolean
  wheel: string
  owners: string
  state: string
  passport:string
  year: number
  run: number
  price: number
  price_old: number
  vin: string
  description: string
  note: string
  specifications: string
  equipment: string
  equipment_groups: string
  tags: string[]
  is_active: boolean
  visible: boolean
  is_hot_offer: boolean
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

        const mappedCars = data.cars.map((car: any) => ({
          id: car.id,
          external_id: car.internal_id,
          unique_id: car.unique_id,
          offer_type: car.offer_type,
          mark: car.mark,
          model: car.model,
          generation: car.generation,
          modification: car.modification,
          modification_auto_ru_xml_id: car.modification_auto_ru_xml_id,
          complectation: car.complectation,
          body_type: car.body_type,
          category: car.category,
          car_type: car.car_type,
          section: car.section,
          dealer_id: car.dealer_id,
          dealer_name: car.dealer_name,
          dealer_description: car.dealer_description,
          engine_power: car.engine_power,
          engine_power_kwh: car.engine_power_kwh,
          engine_volume: car.engine_volume,
          engine_type: car.engine_type,
          gearbox: car.gearbox,
          drive_type: car.drive_type,
          color: car.color,
          is_metallic: car.is_metallic,
          wheel: car.wheel,
          owners: car.owners,
          state: car.state,
          passport: car.passport,
          year: car.year,
          run: car.run,
          price: car.price,
          price_old: car.price_old,
          vin: car.vin,
          description: car.description,
          note: car.note,
          specifications: car.specifications,
          equipment: car.equipment,
          equipment_groups: car.equipment_groups,
          tags: car.tags,
          is_active: car.is_active,
          visible: car.visible,
          is_hot_offer: car.is_hot_offer,
          gallery: car.images.length ? car.images : [car.image],
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

  const handleAddCar = async () => {
    if (currentCar) {
      try {
        if (isEditing) {
          // Update existing car
          await updateCar(currentCar.id, currentCar)
          setCars(cars.map((car) => (car.id === currentCar.id ? currentCar : car)))
        } else {
          // Add new car
          setCars([...cars, { ...currentCar, id: Date.now() }])
        }
        setIsDialogOpen(false)
        setCurrentCar(null)
        setIsEditing(false)
        console.log("Отправка данных на сервер:", currentCar);
      } catch (err: any) {
        setError(err.message || "Ошибка при сохранении автомобиля")
      }
    }
  }  

  const handleEditCar = (car: Car) => {
    setCurrentCar(car)
    setIsEditing(true)
    setIsDialogOpen(true)
  }

  const handleDeleteCar = async (id: number) => {
    try {
      await deleteCar(id)
      setCars(cars.filter((car) => car.id !== id))
    } catch (err: any) {
      setError(err.message || "Ошибка при удалении автомобиля")
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
                    <Label htmlFor="mark">Марка</Label>
                    <Input id="mark" value={currentCar?.mark || ""} onChange={(e) => handleInputChange(e, "mark")} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="model">Модель</Label>
                    <Input id="model" value={currentCar?.model || ""} onChange={(e) => handleInputChange(e, "model")} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="generation">Генерация</Label>
                    <Input id="generation" value={currentCar?.generation || ""} onChange={(e) => handleInputChange(e, "generation")} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="modification">Модификация</Label>
                    <Input id="modification" value={currentCar?.modification || ""} onChange={(e) => handleInputChange(e, "modification")} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="year">Год</Label>
                    <Input id="year" value={currentCar?.year || ""} onChange={(e) => handleInputChange(e, "year")} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Цена</Label>
                    <Input id="price" value={currentCar?.price || ""} onChange={(e) => handleInputChange(e, "price")} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="body_type">Тип кузова</Label>
                    <Input id="body_type" value={currentCar?.body_type || ""} onChange={(e) => handleInputChange(e, "body_type")} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="run">Пробег</Label>
                    <Input id="run" value={currentCar?.run || ""} onChange={(e) => handleInputChange(e, "run")} />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="visible">Видимость</Label>
                    <Switch
                      id="visible"
                      checked={currentCar?.visible || false}
                      onCheckedChange={(checked) =>
                        setCurrentCar((prev) => prev ? { ...prev, visible: checked } : prev)
                      }
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="is_hot_offer">Горячее предложение</Label>
                    <Switch
                      id="is_hot_offer"
                      checked={currentCar?.is_hot_offer || false}
                      onCheckedChange={(checked) =>
                        setCurrentCar((prev) => prev ? { ...prev, is_hot_offer: checked } : prev)
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Описание</Label>
                  <Textarea id="description" value={currentCar?.description || ""} onChange={(e) => handleInputChange(e, "description")} />
                </div>
              </TabsContent>
              {/* <TabsContent value="colors" className="space-y-4">
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
                ))} */}
                {/* <Button onClick={handleAddColor}>Добавить цвет</Button>
              </TabsContent> */}
              {/* <TabsContent value="configurations" className="space-y-4">
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
              </TabsContent> */}
              {/* <TabsContent value="specifications" className="space-y-4">
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
              </TabsContent> */}
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
              <TableCell>{car.mark}</TableCell>
              <TableCell>{car.model}</TableCell>
              <TableCell>{car.year}</TableCell>
              <TableCell>{car.price} ₽</TableCell>
              <TableCell>
                <Button variant="ghost" size="icon" onClick={() => handleEditCar(car)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDeleteCar(car.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  {!car.visible && <EyeOff className="text-muted-foreground" size={18} />}
                  {car.is_hot_offer && <Flame className="text-red-500" size={18} />}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

