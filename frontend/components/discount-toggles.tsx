"use client"

import { useState, useEffect } from "react"
import { Switch } from "@/components/ui/switch"

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

interface DiscountTogglesProps {
  onDiscountsChange?: (total: number, activeDiscounts: string[]) => void
}

export default function DiscountToggles({ onDiscountsChange }: DiscountTogglesProps) {
  const [discounts, setDiscounts] = useState({
    tradeIn: true,
    government: true,
    credit: true,
  })

  const discountItems: Discount[] = [
    { id: "tradeIn", label: "TRADE-IN", amount: DISCOUNTS.tradeIn },
    { id: "government", label: "ГОСПРОГРАММА", amount: DISCOUNTS.government },
    { id: "credit", label: "КРЕДИТ", amount: DISCOUNTS.credit },
  ]

  useEffect(() => {
    const activeDiscounts = Object.entries(discounts)
      .filter(([_, isActive]) => isActive)
      .map(([key]) => key)

    const total = activeDiscounts.reduce((sum, key) => sum + DISCOUNTS[key as keyof typeof DISCOUNTS], 0)

    onDiscountsChange?.(total, activeDiscounts)
  }, [discounts, onDiscountsChange])

  return (
    <div className="space-y-4">
      {discountItems.map((item) => (
        <div key={item.id} className="flex items-center justify-between p-4 rounded-lg border-2 border-muted">
          <div className="flex items-center gap-4">
            <Switch
              checked={discounts[item.id]}
              onCheckedChange={(checked) => setDiscounts((prev) => ({ ...prev, [item.id]: checked }))}
              aria-label={`Toggle ${item.label} discount`}
            />
            <span className="font-medium">{item.label}</span>
          </div>
          <span className="font-bold">- {item.amount.toLocaleString()} ₽</span>
        </div>
      ))}
    </div>
  )
}

