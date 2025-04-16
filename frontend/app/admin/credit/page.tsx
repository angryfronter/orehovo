"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CreditManagement() {
  const [creditConditions, setCreditConditions] = useState({
    minRate: 4.9,
    maxTerm: 84,
    minDownPayment: 0,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCreditConditions((prev) => ({ ...prev, [name]: Number(value) }))
  }

  const handleSave = () => {
    // Here you would typically send the data to your backend
    console.log("Saving credit conditions:", creditConditions)
    alert("Кредитные условия сохранены")
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Управление кредитными условиями</h1>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Редактировать условия</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="minRate">Минимальная ставка (%)</Label>
              <Input
                id="minRate"
                name="minRate"
                type="number"
                value={creditConditions.minRate}
                onChange={handleInputChange}
                step="0.1"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxTerm">Максимальный срок (месяцев)</Label>
              <Input
                id="maxTerm"
                name="maxTerm"
                type="number"
                value={creditConditions.maxTerm}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="minDownPayment">Минимальный первоначальный взнос (%)</Label>
              <Input
                id="minDownPayment"
                name="minDownPayment"
                type="number"
                value={creditConditions.minDownPayment}
                onChange={handleInputChange}
              />
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

