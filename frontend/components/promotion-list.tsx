"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { fetchPromotions } from "@/src/utils/api"

interface Promotion {
  id: number
  title: string
  description: string
  started_at: string
  finished_at: string
}

export default function PromotionList() {
  const [promotions, setPromotions] = useState<Promotion[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const loadPromotions = async () => {
      try {
        const { promotions } = await fetchPromotions()
        setPromotions(promotions)
      } catch (error) {
        console.error("Ошибка при загрузке акций:", error)
      }
    }

    loadPromotions()
  }, [])

  const filteredPromotions = promotions.filter((promo) =>
    promo.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center gap-4">
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPromotions.map((promo) => (
          <Card key={promo.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardHeader className="bg-primary text-white">
              <CardTitle>{promo.title}</CardTitle>
              <CardDescription className="text-primary-foreground">
                До: {new Date(promo.finished_at).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <p>{promo.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
