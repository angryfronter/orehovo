"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"

interface SiteSettings {
  siteName: string
  siteDescription: string
  contactEmail: string
  contactPhone: string
  address: string
  workingHours: string
  facebookUrl: string
  instagramUrl: string
  vkUrl: string
  maintenanceMode: boolean
}

const initialSettings: SiteSettings = {
  siteName: "ДЦ Орехово",
  siteDescription: "Официальный дилер. Продажа и обслуживание автомобилей в Москве.",
  contactEmail: "info@dc-orehovo.ru",
  contactPhone: "+7 (495) 495-95-95",
  address: "г. Москва, Ореховый бульвар, 26",
  workingHours: "Пн-Вс: 9:00 - 21:00",
  facebookUrl: "https://facebook.com/dc-orehovo",
  instagramUrl: "https://instagram.com/dc-orehovo",
  vkUrl: "https://vk.com/dc-orehovo",
  maintenanceMode: false,
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(initialSettings)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setSettings((prev) => ({ ...prev, maintenanceMode: checked }))
  }

  const handleSave = () => {
    // Here you would typically send the settings to your backend
    console.log("Saving settings:", settings)
    alert("Настройки сохранены")
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Настройки сайта</h1>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">Общие</TabsTrigger>
          <TabsTrigger value="contact">Контакты</TabsTrigger>
          <TabsTrigger value="social">Соцсети</TabsTrigger>
          <TabsTrigger value="advanced">Дополнительно</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Общие настройки</CardTitle>
              <CardDescription>Настройте основную информацию о сайте</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="siteName">Название сайта</Label>
                <Input id="siteName" name="siteName" value={settings.siteName} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="siteDescription">Описание сайта</Label>
                <Textarea
                  id="siteDescription"
                  name="siteDescription"
                  value={settings.siteDescription}
                  onChange={handleInputChange}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Контактная информация</CardTitle>
              <CardDescription>Настройте контактные данные</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Email для связи</Label>
                <Input
                  id="contactEmail"
                  name="contactEmail"
                  type="email"
                  value={settings.contactEmail}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactPhone">Телефон</Label>
                <Input
                  id="contactPhone"
                  name="contactPhone"
                  type="tel"
                  value={settings.contactPhone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Адрес</Label>
                <Input id="address" name="address" value={settings.address} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="workingHours">Часы работы</Label>
                <Input
                  id="workingHours"
                  name="workingHours"
                  value={settings.workingHours}
                  onChange={handleInputChange}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="social">
          <Card>
            <CardHeader>
              <CardTitle>Социальные сети</CardTitle>
              <CardDescription>Настройте ссылки на социальные сети</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="facebookUrl">Facebook</Label>
                <Input
                  id="facebookUrl"
                  name="facebookUrl"
                  type="url"
                  value={settings.facebookUrl}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instagramUrl">Instagram</Label>
                <Input
                  id="instagramUrl"
                  name="instagramUrl"
                  type="url"
                  value={settings.instagramUrl}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vkUrl">VK</Label>
                <Input id="vkUrl" name="vkUrl" type="url" value={settings.vkUrl} onChange={handleInputChange} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="advanced">
          <Card>
            <CardHeader>
              <CardTitle>Дополнительные настройки</CardTitle>
              <CardDescription>Настройте дополнительные параметры сайта</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="maintenanceMode" checked={settings.maintenanceMode} onCheckedChange={handleSwitchChange} />
                <Label htmlFor="maintenanceMode">Режим обслуживания</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Button onClick={handleSave}>Сохранить настройки</Button>
    </div>
  )
}

