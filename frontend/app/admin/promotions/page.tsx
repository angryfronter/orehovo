"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Trash2, Plus } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import Image from "next/image"
import { fetchPromotions, createPromotion, updatePromotion, deletePromotion } from "@/src/utils/api"

interface Promotion {
  id: number
  title: string
  description: string
  started_at: string
  finished_at: string
  image: string | null
}

export default function PromotionsManagement() {
  const [promotions, setPromotions] = useState<Promotion[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [currentPromotion, setCurrentPromotion] = useState<Promotion | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    async function loadPromotions() {
      try {
        const data = await fetchPromotions()

        // Преобразуем ответ API в формат нужный фронту
        const mappedPromotions = data.promotions.map((promotion: any) => ({
          id: promotion.id,
          title: promotion.title,
          description: promotion.description,
          started_at: promotion.started_at,
          finished_at: promotion.finished_at,
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

  const handleAddPromotion = async () => {
    if (!currentPromotion) return
  
    try {
      if (isEditing && currentPromotion.id) {
        const updated = await updatePromotion(currentPromotion.id, currentPromotion)
        setPromotions(promotions.map(p => p.id === updated.id ? updated : p))
      } else {
        const created = await createPromotion(currentPromotion)
        setPromotions([...promotions, created])
      }
  
      setIsDialogOpen(false)
      setCurrentPromotion(null)
      setIsEditing(false)
    } catch (err: any) {
      console.error(err)
      setError("Ошибка при сохранении акции")
    }
  }

  const handleEditPromotion = (promo: Promotion) => {
    setCurrentPromotion(promo)
    setIsEditing(true)
    setIsDialogOpen(true)
  }

  const handleDeletePromotion = async (id: number) => {
    try {
      await deletePromotion(id)
      setPromotions(promotions.filter(promo => promo.id !== id))
    } catch (err: any) {
      console.error(err)
      setError("Ошибка при удалении акции")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Управление акциями</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setCurrentPromotion({
                  id: 0,
                  title: "",
                  description: "",
                  started_at: "",
                  finished_at: "",
                  image: null
                })
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
                <Label htmlFor="started_at" className="text-right">
                  Дата начала
                </Label>
                <Input
                  id="started_at"
                  name="started_at"
                  type="date"
                  value={currentPromotion?.started_at || ""}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="finished_at" className="text-right">
                  Дата окончания
                </Label>
                <Input
                  id="finished_at"
                  name="finished_at"
                  type="date"
                  value={currentPromotion?.finished_at || ""}
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
              <TableCell>{promo.started_at}</TableCell>
              <TableCell>{promo.finished_at}</TableCell>
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
