"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function BannerManagement() {
  const [banner, setBanner] = useState({
    title: "Летняя распродажа",
    subtitle: "Скидки до 15% на все модели",
    imageUrl: "/placeholder.svg",
    linkUrl: "/promotions",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setBanner((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    // Here you would typically send the data to your backend
    console.log("Saving banner:", banner)
    alert("Баннер сохранен")
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Управление баннером</h1>

      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Редактировать баннер</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Заголовок</Label>
              <Input id="title" name="title" value={banner.title} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subtitle">Подзаголовок</Label>
              <Textarea id="subtitle" name="subtitle" value={banner.subtitle} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="imageUrl">URL изображения</Label>
              <Input id="imageUrl" name="imageUrl" value={banner.imageUrl} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkUrl">URL ссылки</Label>
              <Input id="linkUrl" name="linkUrl" value={banner.linkUrl} onChange={handleInputChange} />
            </div>
            <Button type="button" onClick={handleSave}>
              Сохранить
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

