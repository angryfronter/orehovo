"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

interface PriceCalculatorProps {
  basePrice: number
  onTestDrive?: () => void
  onPurchase?: () => void
}

interface Discount {
  id: keyof typeof DISCOUNTS
  label: string
  amount: number
}

const DISCOUNTS = {
  tradeIn: 60300,
  government: 50250,
  credit: 90450,
}

export function PriceCalculator({ basePrice, onTestDrive, onPurchase }: PriceCalculatorProps) {
  const [discounts, setDiscounts] = useState({
    tradeIn: true,
    government: true,
    credit: true,
  })

  const [finalPrice, setFinalPrice] = useState(basePrice)
  const [monthlyPayment, setMonthlyPayment] = useState(0)
  const [totalSavings, setTotalSavings] = useState(0)

  const calculatePrices = useCallback(() => {
    let savings = 0
    Object.entries(discounts).forEach(([key, isActive]) => {
      if (isActive) {
        savings += DISCOUNTS[key as keyof typeof DISCOUNTS]
      }
    })

    setTotalSavings(savings)
    const newFinalPrice = basePrice - savings
    setFinalPrice(newFinalPrice)
    setMonthlyPayment(Math.round(newFinalPrice / 60))
  }, [discounts, basePrice])

  useEffect(() => {
    calculatePrices()
  }, [calculatePrices])

  const toggleDiscount = useCallback((discountId: keyof typeof DISCOUNTS) => {
    setDiscounts((prev) => ({ ...prev, [discountId]: !prev[discountId] }))
  }, [])

  const discountItems: Discount[] = [
    { id: "tradeIn", label: "TRADE-IN", amount: DISCOUNTS.tradeIn },
    { id: "government", label: "ГОСПРОГРАММА", amount: DISCOUNTS.government },
    { id: "credit", label: "КРЕДИТ", amount: DISCOUNTS.credit },
  ]

  return (
    <Card className="w-full">
      <CardContent className="p-6 space-y-6">
        <div className="space-y-4">
          {discountItems.map((item) => (
            <div
              key={item.id}
              className={cn(
                "flex items-center justify-between p-4 border rounded-lg",
                discounts[item.id] ? "border-primary bg-primary/5" : "border-muted",
              )}
            >
              <div className="flex items-center gap-4">
                <Switch
                  checked={discounts[item.id]}
                  onCheckedChange={() => toggleDiscount(item.id)}
                  aria-label={`Включить скидку ${item.label}`}
                />
                <span className="font-medium">{item.label}</span>
              </div>
              <span className="font-bold">- {item.amount.toLocaleString()} ₽</span>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center border-t border-b py-4">
          <span className="text-xl font-bold">ВАША ВЫГОДА</span>
          <span className="text-xl font-bold">{totalSavings.toLocaleString()} ₽</span>
        </div>

        <div className="space-y-2">
          <div className="flex items-baseline gap-4">
            <span className="text-3xl font-bold">{finalPrice?.toLocaleString?.() ?? "—"} ₽</span>
            <span className="text-xl text-muted-foreground">{monthlyPayment?.toLocaleString?.() ?? "—"} ₽/мес.</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="default"
            size="lg"
            className={cn("w-full text-base font-medium", "bg-black hover:bg-black/90 text-white")}
            onClick={onPurchase}
          >
            В КРЕДИТ
          </Button>
          <Button variant="outline" size="lg" className="w-full text-base font-medium border-2" onClick={onTestDrive}>
            TRADE-IN
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

