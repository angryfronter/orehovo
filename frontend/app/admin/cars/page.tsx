"use client"

import { useState, useEffect } from "react"
import { fetchCars, deleteCar, updateCar, fetchPromotions } from "@/src/utils/api"
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import { Command, CommandItem, CommandList } from "@/components/ui/command"
import { Checkbox } from "@/components/ui/checkbox"
import { Check } from "lucide-react"

interface Car {
  id: string
  external_id: number
  unique_id: string
  offer_type: string
  mark: {id: string, name: string}
  model: {id: string, name: string, mark_id: string}
  generation: {title: string}
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
  promotions: []
  credit_programs: string[]
  gallery: string[]
  car_colors?: {
    id: string
    name: string
    hex: string
    images: string[]
  }[]
}

interface Promotion {
  id: string
  title: string
}

export default function CarsManagement() {
  const [cars, setCars] = useState<Car[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [currentCar, setCurrentCar] = useState<Car | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [promotions, setPromotions] = useState<Promotion[]>([])

  useEffect(() => {
    async function loadPromotions() {
      try {
        const data = await fetchPromotions()

        const mappedPromotions = data.promotions.map((promotion: any) => ({
          id: promotion.id,
          title: promotion.title
        }))

        setPromotions(mappedPromotions)
      } catch (err: any) {
        console.error(err)
        setError(err.message || "Ошибка загрузки данных")
      } finally {
        setIsLoading(false)
      }
    }
  
    loadPromotions()
  }, [])

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
          promotions: car.promotions?.map((p: any) => p.id) || [],
          car_colors: car.car_colors?.map((c: any) => ({
            id: c.id,
            name: c.name,
            hex: c.hex || "#000000",
            images: c.images || []
          })) || []
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
          await updateCar(currentCar.id, { car: currentCar })
          setCars(cars.map((car) => (car.id === currentCar.id ? currentCar : car)))
        } else {
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

  const handleDeleteCar = async (id: string) => {
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
                setCurrentCar({
                  id: '',
                  external_id: 0,
                  unique_id: "",
                  offer_type: "",
                  mark: {id: "", name: ""},
                  model: {id: "", name: "", mark_id: ""},
                  generation: {title: ""},
                  modification: "",
                  modification_auto_ru_xml_id: "",
                  complectation: "",
                  body_type: "",
                  category: "",
                  car_type: "",
                  section: "",
                  dealer_id: 0,
                  dealer_name: "",
                  dealer_description: "",
                  engine_power: 0,
                  engine_power_kwh: 0,
                  engine_volume: 0,
                  engine_type: "",
                  gearbox: "",
                  drive_type: "",
                  color: "",
                  is_metallic: false,
                  wheel: "",
                  owners: "",
                  state: "",
                  passport:"",
                  year: 0,
                  run: 0,
                  price: 0,
                  price_old: 0,
                  vin: "",
                  description: "",
                  note:"",
                  specifications:"",
                  equipment:"",
                  equipment_groups:"",
                  tags:[""],
                  is_active:false,
                  visible:false,
                  is_hot_offer:false,
                  gallery: [],
                  promotions: [],
                  credit_programs: [],
                })
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
                    <Input
                      id="mark"
                      value={currentCar?.mark?.name || ""}
                      onChange={(e) =>
                        setCurrentCar((prev) =>
                          prev ? { ...prev, mark: { ...prev.mark, name: e.target.value } } : prev
                        )
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="model">Модель</Label>
                    <Input
                      id="model"
                      value={currentCar?.model?.name || ""}
                      onChange={(e) =>
                        setCurrentCar((prev) =>
                          prev ? { ...prev, model: { ...prev.model, name: e.target.value } } : prev
                        )
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="modification">Модификация</Label>
                    <Input id="modification" value={currentCar?.modification || ""} onChange={(e) => handleInputChange(e, "modification")} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Цена</Label>
                    <Input id="price" value={currentCar?.price || ""} onChange={(e) => handleInputChange(e, "price")} />
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
                  <div className="space-y-2">
                    <Label htmlFor="promotions">Акции</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-between">
                          {currentCar?.promotions?.length
                            ? promotions
                                .filter(p => currentCar.promotions.includes(String(p.id)))
                                .map(p => p.title)
                                .join(", ")
                            : "Выбрать акции"}
                          <span className="ml-2">&#9662;</span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandList>
                            {promotions.map(promotion => {
                              const isSelected = Array.isArray(currentCar?.promotions) && currentCar.promotions.includes(String(promotion.id))
                              return (
                                <CommandItem
                                  key={promotion.id}
                                  onSelect={() => {
                                    if (!currentCar) return
                                    const promoId = String(promotion.id)
                                    const updatedPromotions = isSelected
                                      ? currentCar.promotions.filter(id => id !== promoId)
                                      : [...(currentCar.promotions || []), promoId]
                                    setCurrentCar({ ...currentCar, promotions: updatedPromotions })
                                  }}
                                  className="flex items-center gap-2"
                                >
                                  <Checkbox checked={isSelected} />
                                  <span>{promotion.title}</span>
                                  {isSelected && <Check className="ml-auto h-4 w-4 text-primary" />}
                                </CommandItem>
                              )
                            })}
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="colors" className="space-y-4">
                <Button
                  onClick={() => {
                    if (currentCar) {
                      const updatedColors = currentCar.car_colors || []
                      const newColor = {
                        id: String(Date.now()),
                        name: "",        // пустое имя цвета для заполнения
                        hex: "#000000",  // дефолтный hex
                        images: [],
                      }
                      setCurrentCar({ ...currentCar, car_colors: [...updatedColors, newColor] })
                    }
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" /> Добавить цвет
                </Button>

                {currentCar?.car_colors?.map((color, colorIndex) => (
                  <div key={color.id} className="border p-4 rounded-md space-y-4">
                    <div className="flex justify-between items-center gap-4">
                      {/* Название цвета */}
                      <div className="flex flex-col flex-1">
                        <Label htmlFor={`color-name-${color.id}`}>Название цвета</Label>
                        <Input
                          id={`color-name-${color.id}`}
                          type="text"
                          value={color.name}
                          onChange={(e) => {
                            const updatedColors = [...(currentCar.car_colors || [])]
                            updatedColors[colorIndex] = { ...updatedColors[colorIndex], name: e.target.value }
                            setCurrentCar({ ...currentCar, car_colors: updatedColors })
                          }}
                          placeholder="Например, Красный"
                        />
                      </div>

                      {/* Цвет (HEX) */}
                      <div className="flex flex-col flex-1">
                        <Label htmlFor={`color-hex-${color.id}`}>Цвет (HEX)</Label>
                        <input
                          id={`color-hex-${color.id}`}
                          type="color"
                          value={color.hex || "#000000"}
                          onChange={(e) => {
                            const updatedColors = [...(currentCar.car_colors || [])]
                            updatedColors[colorIndex] = { ...updatedColors[colorIndex], hex: e.target.value }
                            setCurrentCar({ ...currentCar, car_colors: updatedColors })
                          }}
                          className="h-10 w-20 p-0 border rounded cursor-pointer"
                        />
                      </div>

                      {/* Кнопка удаления цвета */}
                      <Button
                        variant="ghost"
                        onClick={() => {
                          const updatedColors = currentCar.car_colors?.filter((_, i) => i !== colorIndex) || []
                          setCurrentCar({ ...currentCar, car_colors: updatedColors })
                        }}
                      >
                        <Trash2 className="w-5 h-5 text-red-500" />
                      </Button>
                    </div>

                    {/* Загрузка и отображение изображений */}
                    <div className="flex flex-col gap-2">
                      <Label>Изображения</Label>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => {
                          const files = e.target.files
                          if (!files) return
                          const newImageUrls = Array.from(files).map(file => URL.createObjectURL(file))
                          const updatedColors = [...(currentCar.car_colors || [])]
                          updatedColors[colorIndex] = {
                            ...updatedColors[colorIndex],
                            images: [...(updatedColors[colorIndex].images || []), ...newImageUrls],
                          }
                          setCurrentCar({ ...currentCar, car_colors: updatedColors })
                        }}
                      />
                      <div className="flex gap-2 flex-wrap">
                        {color.images?.map((img, imgIndex) => (
                          <div key={imgIndex} className="relative">
                            <Image
                              src={img}
                              alt={`Изображение цвета ${color.name}`}
                              width={80}
                              height={80}
                              className="rounded-md border"
                            />
                            <button
                              type="button"
                              className="absolute top-0 right-0 bg-white text-red-500 p-0.5 rounded-full"
                              onClick={() => {
                                const updatedColors = [...(currentCar.car_colors || [])]
                                updatedColors[colorIndex] = {
                                  ...updatedColors[colorIndex],
                                  images: updatedColors[colorIndex].images.filter((_, i) => i !== imgIndex),
                                }
                                setCurrentCar({ ...currentCar, car_colors: updatedColors })
                              }}
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
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
              <TableCell>{car.mark.name}</TableCell>
              <TableCell>{car.model.name}</TableCell>
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

