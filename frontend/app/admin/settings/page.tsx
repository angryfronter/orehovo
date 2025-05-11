"use client"

import { useEffect, useState } from "react"
import { fetchContact, updateContact } from "@/src/utils/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

interface Contact {
  id: string
  address: string
  phone: string
  email: string
  opening_hours: string
  website_name: string
  website_description: string
  facebook_link: string
  vk_link: string
  instagram_link: string
}

export default function SettingsPage() {
  const [contact, setContact] = useState<Contact | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchContact()
      .then((data) => {
        setContact(data.contact)
        setLoading(false)
      })
      .catch((error) => {
        console.error(error)
        setLoading(false)
      })
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setContact((prev) => prev ? { ...prev, [name]: value } : prev)
  }

  const handleSave = async () => {
    if (contact) {
      try {
        const updated = await updateContact(contact.id, contact)
        setContact(updated)
        alert("Контактная информация обновлена")
      } catch (error) {
        alert("Ошибка при сохранении")
      }
    }
  }

  if (loading || !contact) return <p>Загрузка...</p>

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Настройки сайта</h1>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">Общие</TabsTrigger>
          <TabsTrigger value="contact">Контакты</TabsTrigger>
          <TabsTrigger value="social">Соцсети</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Общие настройки</CardTitle>
              <CardDescription>Основная информация о сайте</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="website_name">Название сайта</Label>
                <Input id="website_name" name="website_name" value={contact.website_name} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website_description">Описание сайта</Label>
                <Textarea id="website_description" name="website_description" value={contact.website_description} onChange={handleChange} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Контакты</CardTitle>
              <CardDescription>Контактная информация</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" value={contact.email} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Телефон</Label>
                <Input id="phone" name="phone" value={contact.phone} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Адрес</Label>
                <Input id="address" name="address" value={contact.address} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="opening_hours">Часы работы</Label>
                <Input id="opening_hours" name="opening_hours" value={contact.opening_hours} onChange={handleChange} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social">
          <Card>
            <CardHeader>
              <CardTitle>Социальные сети</CardTitle>
              <CardDescription>Ссылки на соцсети</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="facebook_link">Facebook</Label>
                <Input id="facebook_link" name="facebook_link" value={contact.facebook_link} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instagram_link">Instagram</Label>
                <Input id="instagram_link" name="instagram_link" value={contact.instagram_link} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vk_link">VK</Label>
                <Input id="vk_link" name="vk_link" value={contact.vk_link} onChange={handleChange} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Button onClick={handleSave}>Сохранить</Button>
    </div>
  )
}
