'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function TradeInForm() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [carBrand, setCarBrand] = useState('')
  const [carModel, setCarModel] = useState('')
  const [carYear, setCarYear] = useState('')
  const [carMileage, setCarMileage] = useState('')
  const [comment, setComment] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log({ name, phone, carBrand, carModel, carYear, carMileage, comment })
  }

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Оценить ваш автомобиль</CardTitle>
        <CardDescription>Заполните форму и получите предварительную оценку вашего автомобиля</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Ваше имя</Label>
              <Input
                id="name"
                placeholder="Иван Иванов"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Телефон</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+7 (___) ___-__-__"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="carBrand">Марка автомобиля</Label>
              <Input
                id="carBrand"
                placeholder="Например, Toyota"
                value={carBrand}
                onChange={(e) => setCarBrand(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="carModel">Модель автомобиля</Label>
              <Input
                id="carModel"
                placeholder="Например, Camry"
                value={carModel}
                onChange={(e) => setCarModel(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="carYear">Год выпуска</Label>
              <Select onValueChange={setCarYear}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите год" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                    <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="carMileage">Пробег (км)</Label>
              <Input
                id="carMileage"
                type="number"
                placeholder="Например, 50000"
                value={carMileage}
                onChange={(e) => setCarMileage(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="comment">Дополнительная информация</Label>
            <Textarea
              id="comment"
              placeholder="Опишите состояние автомобиля, комплектацию и другие важные детали"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" className="w-full">Отправить заявку</Button>
      </CardFooter>
    </Card>
  )
}

