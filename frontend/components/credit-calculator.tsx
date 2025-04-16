'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Calculator, Car, Percent } from 'lucide-react'

export default function CreditCalculator() {
  const [carPrice, setCarPrice] = useState('2000000')
  const [downPayment, setDownPayment] = useState('400000')
  const [term, setTerm] = useState('60')
  const [interestRate, setInterestRate] = useState('4.9')
  const [monthlyPayment, setMonthlyPayment] = useState(0)

  const calculateCredit = () => {
    const principal = Number(carPrice) - Number(downPayment)
    const monthlyRate = Number(interestRate) / 100 / 12
    const numberOfPayments = Number(term)
    const payment = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
    setMonthlyPayment(Math.round(payment))
  }

  return (
    <Card className="bg-white shadow-xl">
      <CardHeader className="space-y-1">
        <div className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          <CardTitle className="text-2xl">Кредитный калькулятор</CardTitle>
        </div>
        <CardDescription>
          Рассчитайте ежемесячный платеж и получите предварительное одобрение онлайн
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="carPrice">Стоимость автомобиля</Label>
            <div className="flex items-center">
              <Car className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="font-medium">{Number(carPrice).toLocaleString()} ₽</span>
            </div>
          </div>
          <Slider
            id="carPrice"
            min={500000}
            max={10000000}
            step={50000}
            value={[Number(carPrice)]}
            onValueChange={(value) => setCarPrice(value[0].toString())}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="downPayment">Первоначальный взнос</Label>
            <span className="font-medium">{Number(downPayment).toLocaleString()} ₽</span>
          </div>
          <Slider
            id="downPayment"
            min={0}
            max={Number(carPrice)}
            step={50000}
            value={[Number(downPayment)]}
            onValueChange={(value) => setDownPayment(value[0].toString())}
            className="w-full"
          />
          <p className="text-sm text-muted-foreground">
            {Math.round((Number(downPayment) / Number(carPrice)) * 100)}% от стоимости
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="term">Срок кредита</Label>
            <span className="font-medium">{term} мес.</span>
          </div>
          <Slider
            id="term"
            min={12}
            max={84}
            step={12}
            value={[Number(term)]}
            onValueChange={(value) => setTerm(value[0].toString())}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="interestRate">Процентная ставка</Label>
            <div className="flex items-center">
              <Percent className="h-4 w-4 mr-1 text-muted-foreground" />
              <span className="font-medium">{interestRate}%</span>
            </div>
          </div>
          <Select value={interestRate} onValueChange={setInterestRate}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="4.9">4.9% - Льготная ставка</SelectItem>
              <SelectItem value="12">12% - Стандартная ставка</SelectItem>
              <SelectItem value="18">18% - Без подтверждения дохода</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter className="flex-col space-y-4">
        <Button onClick={calculateCredit} className="w-full" size="lg">
          Рассчитать
        </Button>
        {monthlyPayment > 0 && (
          <div className="w-full p-4 bg-primary/5 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Ежемесячный платеж:</p>
            <p className="text-3xl font-bold text-primary">{monthlyPayment.toLocaleString()} ₽</p>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}

