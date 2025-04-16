'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { BadgeCheck } from 'lucide-react'

export default function CreditForm() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [phoneError, setPhoneError] = useState('')

  const formatPhoneNumber = (value: string) => {
    const phoneNumber = value.replace(/\D/g, '')
    const phoneNumberLength = phoneNumber.length

    if (phoneNumberLength <= 1) return '+7'
    if (phoneNumberLength < 4) return `+7 (${phoneNumber.slice(1)}`
    if (phoneNumberLength < 7) return `+7 (${phoneNumber.slice(1, 4)}) ${phoneNumber.slice(4)}`
    return `+7 (${phoneNumber.slice(1, 4)}) ${phoneNumber.slice(4, 7)}-${phoneNumber.slice(7, 11)}`
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value)
    setPhone(formattedPhoneNumber)
    setPhoneError('')
  }

  const validatePhone = () => {
    const phoneRegex = /^\+7 $$\d{3}$$ \d{3}-\d{4}$/
    if (!phoneRegex.test(phone)) {
      setPhoneError('Пожалуйста, введите корректный номер телефона')
      return false
    }
    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validatePhone()) {
      return
    }
    if (!agreed) {
      alert('Пожалуйста, подтвердите согласие на обработку персональных данных')
      return
    }
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', { name, phone })
    // Reset form fields after submission
    setName('')
    setPhone('')
    setAgreed(false)
  }

  return (
    <Card className="bg-white shadow-xl">
      <CardHeader className="space-y-1">
        <div className="flex items-center gap-2">
          <BadgeCheck className="h-5 w-5 text-primary" />
          <CardTitle className="text-2xl">Получить одобрение</CardTitle>
        </div>
        <CardDescription>
          Оставьте заявку и получите решение по кредиту за 30 минут
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Ваше имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <div>
            <Input
              placeholder="+7 (___) ___-__-__"
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              required
            />
            {phoneError && <p className="text-sm text-red-500 mt-1">{phoneError}</p>}
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={agreed}
              onCheckedChange={(checked) => setAgreed(checked as boolean)}
            />
            <label htmlFor="terms" className="text-sm text-muted-foreground">
              Согласен на обработку персональных данных
            </label>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col space-y-4">
        <Button onClick={handleSubmit} className="w-full" size="lg">Отправить заявку</Button>
        <p className="text-xs text-center text-muted-foreground px-6">
          Нажимая кнопку "Отправить заявку", вы соглашаетесь с условиями обработки персональных данных
        </p>
      </CardFooter>
    </Card>
  )
}

