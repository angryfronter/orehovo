"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface CarDetailsViewProps {
  model: string
  brand: string
  basePrice: number
  monthlyPayment: number
  discounts: {
    id: string
    label: string
    amount: number
  }[]
  specifications: Record<string, string>
  onTestDrive?: () => void
  onPurchase?: () => void
}

export default function CarDetailsView({
  model,
  brand,
  basePrice,
  monthlyPayment,
  discounts,
  specifications,
  onTestDrive,
  onPurchase,
}: CarDetailsViewProps) {
  const [selectedDiscounts, setSelectedDiscounts] = useState<string[]>([])

  const toggleDiscount = (discountId: string) => {
    setSelectedDiscounts((prev) =>
      prev.includes(discountId) ? prev.filter((id) => id !== discountId) : [...prev, discountId],
    )
  }

  const totalDiscount = discounts
    .filter((discount) => selectedDiscounts.includes(discount.id))
    .reduce((sum, discount) => sum + discount.amount, 0)

  const finalPrice = basePrice - totalDiscount

  return (
    <div className="container max-w-5xl mx-auto px-4 py-6">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">
            {brand} {model}
          </h1>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onTestDrive}>
              Тест-драйв
            </Button>
            <Button onClick={onPurchase}>Купить</Button>
          </div>
        </div>

        {/* Price Calculator */}
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 gap-8 mb-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Стоимость</p>
                <p className="text-4xl font-bold">от {finalPrice.toLocaleString()} ₽</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Ежемесячный платеж</p>
                <p className="text-4xl font-bold">от {monthlyPayment.toLocaleString()} ₽/мес</p>
              </div>
            </div>

            <div className="space-y-3">
              {discounts.map((discount) => (
                <button
                  key={discount.id}
                  onClick={() => toggleDiscount(discount.id)}
                  className={cn(
                    "w-full flex items-center justify-between p-4 rounded-lg border-2 transition-all",
                    "hover:border-primary/50",
                    selectedDiscounts.includes(discount.id) ? "border-primary bg-primary/5" : "border-muted",
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={cn(
                        "w-5 h-5 rounded border-2 flex items-center justify-center transition-colors",
                        selectedDiscounts.includes(discount.id)
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-muted-foreground",
                      )}
                    >
                      {selectedDiscounts.includes(discount.id) && <Check className="h-3.5 w-3.5" />}
                    </div>
                    <span className="font-medium">{discount.label}</span>
                  </div>
                  <span className="font-bold">{discount.amount.toLocaleString()} ₽</span>
                </button>
              ))}
            </div>

            {totalDiscount > 0 && (
              <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium">Общая выгода</span>
                  <span className="text-lg font-bold text-primary">{totalDiscount.toLocaleString()} ₽</span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 mt-6">
              <Button variant="outline" onClick={onTestDrive} size="lg">
                Тест-драйв
              </Button>
              <Button onClick={onPurchase} size="lg">
                Купить
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Specifications */}
        <Tabs defaultValue="specifications" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="specifications">Характеристики</TabsTrigger>
            <TabsTrigger value="configurations">Комплектации</TabsTrigger>
          </TabsList>
          <TabsContent value="specifications" className="mt-6">
            <div className="grid gap-4">
              {Object.entries(specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between py-3 border-b last:border-0">
                  <span className="text-muted-foreground">{key}</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="configurations">{/* Configurations content - to be implemented */}</TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

