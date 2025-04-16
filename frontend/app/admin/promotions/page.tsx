"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Trash2, Plus } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import Image from "next/image"

interface Promotion {
  id: number
  title: string
  description: string
  startDate: string
  endDate: string
  image: string
}

const initialPromotions: Promotion[] = [
  {
    id: 1,
    title: "Летняя распродажа",
    description: "Скидки до 15% на все модели",
    startDate: "2023-06-01",
    endDate: "2023-08-31",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    title: "Кредит 0%",
    description: "Первый взнос от 10%, срок до 3 лет",
    startDate: "2023-07-01",
    endDate: "2023-09-30",
    image: "/placeholder.svg",
  },
]

export default function PromotionsManagement() {
  const [promotions, setPromotions] = useState<Promotion[]>(initialPromotions)
  const [currentPromotion, setCurrentPromotion] = useState<Promotion | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (currentPromotion) {
      setCurrentPromotion({ ...currentPromotion, [name]: value })
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && currentPromotion) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setCurrentPromotion({ ...currentPromotion, image: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddPromotion = () => {
    if (currentPromotion) {
      if (isEditing) {
        setPromotions(promotions.map((promo) => (promo.id === currentPromotion.id ? currentPromotion : promo)))
      } else {
        setPromotions([...promotions, { ...currentPromotion, id: Date.now() }])
      }
      setIsDialogOpen(false)
      setCurrentPromotion(null)
      setIsEditing(false)
    }
  }

  const handleEditPromotion = (promo: Promotion) => {
    setCurrentPromotion(promo)
    setIsEditing(true)
    setIsDialogOpen(true)
  }

  const handleDeletePromotion = (id: number) => {
    setPromotions(promotions.filter((promo) => promo.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Управление акциями</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setCurrentPromotion(null)
                setIsEditing(false)
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Добавить акцию
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{isEditing ? "Редактировать акцию" : "Добавить новую акцию"}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Название
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={currentPromotion?.title || ""}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Описание
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={currentPromotion?.description || ""}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="startDate" className="text-right">
                  Дата начала
                </Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={currentPromotion?.startDate || ""}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="endDate" className="text-right">
                  Дата окончания
                </Label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={currentPromotion?.endDate || ""}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image" className="text-right">
                  Изображение
                </Label>
                <Input id="image" name="image" type="file" onChange={handleImageUpload} className="col-span-3" />
              </div>
              {currentPromotion?.image && (
                <div className="col-span-4">
                  <Image
                    src={currentPromotion.image || "/placeholder.svg"}
                    alt="Preview"
                    width={200}
                    height={200}
                    className="object-cover rounded-md"
                  />
                </div>
              )}
            </div>
            <Button onClick={handleAddPromotion}>{isEditing ? "Сохранить изменения" : "Добавить акцию"}</Button>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Название</TableHead>
            <TableHead>Описание</TableHead>
            <TableHead>Дата начала</TableHead>
            <TableHead>Дата окончания</TableHead>
            <TableHead>Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {promotions.map((promo) => (
            <TableRow key={promo.id}>
              <TableCell>{promo.title}</TableCell>
              <TableCell>{promo.description}</TableCell>
              <TableCell>{promo.startDate}</TableCell>
              <TableCell>{promo.endDate}</TableCell>
              <TableCell>
                <Button variant="ghost" size="icon" onClick={() => handleEditPromotion(promo)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDeletePromotion(promo.id)}>
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

