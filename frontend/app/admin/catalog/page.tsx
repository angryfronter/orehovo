"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Trash2, Plus } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface Car {
  id: number
  brand: string
  model: string
  year: number
  price: number
  engine: string
  transmission: string
  color: string
  description: string
}

const initialCars: Car[] = [
  {
    id: 1,
    brand: "BAIC",
    model: "U5 PLUS",
    year: 2023,
    price: 1670000,
    engine: "1.5L",
    transmission: "CVT",
    color: "Серебристый",
    description: "Комфортный седан с современным оснащением",
  },
  {
    id: 2,
    brand: "CHERY",
    model: "Tiggo 7 Pro",
    year: 2023,
    price: 2300000,
    engine: "1.5T",
    transmission: "CVT",
    color: "Белый",
    description: "Стильный кроссовер с богатым оснащением",
  },
  {
    id: 3,
    brand: "EXEED",
    model: "TXL",
    year: 2023,
    price: 2900000,
    engine: "2.0T",
    transmission: "7DCT",
    color: "Черный",
    description: "Премиальный кроссовер с высоким уровнем комфорта",
  },
]

export default function CatalogManagement() {
  const [cars, setCars] = useState<Car[]>(initialCars)
  const [newCar, setNewCar] = useState<Car>({
    id: 0,
    brand: "",
    model: "",
    year: new Date().getFullYear(),
    price: 0,
    engine: "",
    transmission: "",
    color: "",
    description: "",
  })
  const [isEditing, setIsEditing] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewCar((prev) => ({ ...prev, [name]: name === "price" || name === "year" ? Number(value) : value }))
  }

  const handleAddCar = () => {
    if (isEditing) {
      setCars((prev) => prev.map((car) => (car.id === newCar.id ? newCar : car)))
    } else {
      setCars((prev) => [...prev, { ...newCar, id: Date.now() }])
    }
    setNewCar({
      id: 0,
      brand: "",
      model: "",
      year: new Date().getFullYear(),
      price: 0,
      engine: "",
      transmission: "",
      color: "",
      description: "",
    })
    setIsEditing(false)
  }

  const handleEditCar = (car: Car) => {
    setNewCar(car)
    setIsEditing(true)
  }

  const handleDeleteCar = (id: number) => {
    setCars((prev) => prev.filter((car) => car.id !== id))
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Управление каталогом</h1>

      <Dialog>
        <DialogTrigger asChild>
          <Button className="mb-4">
            <Plus className="mr-2 h-4 w-4" />
            Добавить автомобиль
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{isEditing ? "Редактировать автомобиль" : "Добавить новый автомобиль"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="brand" className="text-right">
                Марка
              </Label>
              <Input id="brand" name="brand" value={newCar.brand} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="model" className="text-right">
                Модель
              </Label>
              <Input id="model" name="model" value={newCar.model} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="year" className="text-right">
                Год
              </Label>
              <Input
                id="year"
                name="year"
                type="number"
                value={newCar.year}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Цена
              </Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={newCar.price}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="engine" className="text-right">
                Двигатель
              </Label>
              <Input
                id="engine"
                name="engine"
                value={newCar.engine}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="transmission" className="text-right">
                КПП
              </Label>
              <Input
                id="transmission"
                name="transmission"
                value={newCar.transmission}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="color" className="text-right">
                Цвет
              </Label>
              <Input id="color" name="color" value={newCar.color} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Описание
              </Label>
              <Textarea
                id="description"
                name="description"
                value={newCar.description}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
          </div>
          <Button onClick={handleAddCar}>{isEditing ? "Сохранить изменения" : "Добавить автомобиль"}</Button>
        </DialogContent>
      </Dialog>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Марка</TableHead>
            <TableHead>Модель</TableHead>
            <TableHead>Год</TableHead>
            <TableHead>Цена</TableHead>
            <TableHead>Двигатель</TableHead>
            <TableHead>КПП</TableHead>
            <TableHead>Цвет</TableHead>
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
              <TableCell>{car.engine}</TableCell>
              <TableCell>{car.transmission}</TableCell>
              <TableCell>{car.color}</TableCell>
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

