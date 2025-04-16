"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

const promotions = [
  {
    id: 1,
    title: "Зимняя резина в подарок",
    description: "При покупке любого автомобиля получите комплект премиальной зимней резины в подарок!",
    endDate: "2023-12-31",
    category: "Подарки",
    price: 2500000,
  },
  {
    id: 2,
    title: "Страховка КАСКО за наш счет",
    description: "Оформите кредит на автомобиль и получите годовую страховку КАСКО бесплатно!",
    endDate: "2023-11-30",
    category: "Финансы",
    price: 2200000,
  },
  {
    id: 3,
    title: "Три платежа по кредиту в подарок",
    description: "При покупке автомобиля в кредит мы оплатим за вас первые 3 платежа!",
    endDate: "2023-10-31",
    category: "Финансы",
    price: 1800000,
  },
  {
    id: 4,
    title: "Эксклюзивная комплектация",
    description: "Получите дополнительное оборудование стоимостью до 500 000 ₽ при заказе премиальных моделей",
    endDate: "2023-12-15",
    category: "Комплектация",
    price: 3200000,
  },
  {
    id: 5,
    title: "VIP-обслуживание",
    description: "Купите автомобиль и получите карту на VIP-обслуживание в течение 2 лет",
    endDate: "2023-11-15",
    category: "Сервис",
    price: 2800000,
  },
]

export default function PromotionList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Все")

  const filteredPromotions = promotions.filter(
    (promo) =>
      promo.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "Все" || promo.category === selectedCategory),
  )

  const categories = ["Все", ...new Set(promotions.map((promo) => promo.category))]

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-64">
          <Input
            type="text"
            placeholder="Поиск акций"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPromotions.map((promo) => (
          <Card key={promo.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardHeader className="bg-primary text-white">
              <CardTitle>{promo.title}</CardTitle>
              <CardDescription className="text-primary-foreground">До: {promo.endDate}</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <p className="mb-6">{promo.description}</p>
              <Badge>{promo.category}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

