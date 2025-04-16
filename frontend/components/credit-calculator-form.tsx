"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Calculator, Car, Percent, Clock, BadgeCheck } from "lucide-react"

interface CalculationResult {
  monthlyPayment: number
  totalAmount: number
  interestAmount: number
}

export default function CreditCalculatorForm() {
  // Calculator state
  const [carPrice, setCarPrice] = useState(2000000)
  const [downPayment, setDownPayment] = useState(400000)
  const [term, setTerm] = useState(60)
  const [interestRate, setInterestRate] = useState(4.9)
  const [calculationResult, setCalculationResult] = useState<CalculationResult | null>(null)

  // Form state
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [agreed, setAgreed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const formatPhoneNumber = (value: string) => {
    const phoneNumber = value.replace(/\D/g, "")
    const phoneNumberLength = phoneNumber.length

    if (phoneNumberLength <= 1) return "+7"
    if (phoneNumberLength < 4) return `+7 (${phoneNumber.slice(1)}`
    if (phoneNumberLength < 7) return `+7 (${phoneNumber.slice(1, 4)}) ${phoneNumber.slice(4)}`
    return `+7 (${phoneNumber.slice(1, 4)}) ${phoneNumber.slice(4, 7)}-${phoneNumber.slice(7, 11)}`
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value)
    setPhone(formattedPhoneNumber)
  }

  const calculateCredit = () => {
    const principal = carPrice - downPayment
    const monthlyRate = interestRate / 100 / 12
    const numberOfPayments = term

    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1)

    const totalAmount = monthlyPayment * numberOfPayments
    const interestAmount = totalAmount - principal

    setCalculationResult({
      monthlyPayment: Math.round(monthlyPayment),
      totalAmount: Math.round(totalAmount),
      interestAmount: Math.round(interestAmount),
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!calculationResult || !agreed) return

    setIsSubmitting(true)
    try {
      // Here you would typically send the data to your backend
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsSuccess(true)
      setTimeout(() => {
        setIsSuccess(false)
        // Reset form
        setName("")
        setPhone("")
        setAgreed(false)
        setCalculationResult(null)
      }, 3000)
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          <CardTitle>Кредитный калькулятор</CardTitle>
        </div>
        <CardDescription>Рассчитайте ежемесячный платеж и получите предварительное одобрение онлайн</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!calculationResult ? (
          // Calculator View
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Стоимость автомобиля</Label>
                  <div className="flex items-center">
                    <Car className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="font-medium">{carPrice.toLocaleString()} ₽</span>
                  </div>
                </div>
                <Slider
                  value={[carPrice]}
                  min={500000}
                  max={10000000}
                  step={50000}
                  onValueChange={(value) => setCarPrice(value[0])}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Первоначальный взнос</Label>
                  <span className="font-medium">{downPayment.toLocaleString()} ₽</span>
                </div>
                <Slider
                  value={[downPayment]}
                  min={0}
                  max={carPrice}
                  step={50000}
                  onValueChange={(value) => setDownPayment(value[0])}
                />
                <p className="text-sm text-muted-foreground">
                  {Math.round((downPayment / carPrice) * 100)}% от стоимости
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Срок кредита</Label>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="font-medium">{term} мес.</span>
                  </div>
                </div>
                <Slider value={[term]} min={12} max={84} step={12} onValueChange={(value) => setTerm(value[0])} />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Процентная ставка</Label>
                  <div className="flex items-center">
                    <Percent className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span className="font-medium">{interestRate}%</span>
                  </div>
                </div>
                <Select value={interestRate.toString()} onValueChange={(value) => setInterestRate(Number(value))}>
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
            </div>
          </div>
        ) : (
          // Result View with Contact Form
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground">Ежемесячный платеж</p>
                <p className="text-2xl font-bold text-primary">{calculationResult.monthlyPayment.toLocaleString()} ₽</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Сумма кредита</p>
                <p className="text-2xl font-bold">{(carPrice - downPayment).toLocaleString()} ₽</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Ваше имя</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Иван Иванов"
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Телефон</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="+7 (___) ___-__-__"
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" checked={agreed} onCheckedChange={(checked) => setAgreed(checked as boolean)} />
                <label htmlFor="terms" className="text-sm text-muted-foreground">
                  Согласен на обработку персональных данных
                </label>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {!calculationResult ? (
          <Button onClick={calculateCredit} className="w-full">
            Рассчитать кредит
          </Button>
        ) : (
          <Button onClick={handleSubmit} className="w-full" disabled={!agreed || isSubmitting}>
            {isSuccess ? (
              <span className="flex items-center gap-2">
                <BadgeCheck className="h-5 w-5" />
                Заявка отправлена
              </span>
            ) : isSubmitting ? (
              "Отправка заявки..."
            ) : (
              "Отправить заявку"
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

