"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Car, Clock, CreditCard, Phone, Gift } from "lucide-react"

interface RequestFormProps {
  isOpen: boolean
  onClose: () => void
  formType: "credit" | "purchase" | "test-drive" | "callback" | "special-offer"
}

export function RequestForm({ isOpen, onClose, formType }: RequestFormProps) {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [agreed, setAgreed] = useState(false)
  const [phoneError, setPhoneError] = useState("")

  useEffect(() => {
    if (!isOpen) {
      setName("")
      setPhone("")
      setAgreed(false)
      setPhoneError("")
    }
  }, [isOpen])

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
    setPhoneError("")
  }

  const validatePhone = () => {
    const phoneRegex = /^\+7 $$\d{3}$$ \d{3}-\d{4}$/
    if (!phoneRegex.test(phone)) {
      setPhoneError("Пожалуйста, введите корректный номер телефона")
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
      alert("Пожалуйста, подтвердите согласие на обработку персональных данных")
      return
    }
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", { name, phone, formType })
    onClose()
  }

  const getFormContent = () => {
    switch (formType) {
      case "credit":
        return {
          title: "Рассчитайте выгодный кредит прямо сейчас!",
          subtitle: "Получите персональное предложение за 2 минуты",
          icon: <CreditCard className="w-12 h-12 text-primary" />,
          benefits: ["Ставка от 3.9%", "Одобрение за 1 час", "Первый платеж через 3 месяца"],
        }
      case "purchase":
        return {
          title: "Купите автомобиль вашей мечты!",
          subtitle: "Оставьте заявку и получите специальное предложение",
          icon: <Car className="w-12 h-12 text-primary" />,
          benefits: ["Выгода до 300 000 ₽", "Подарок при покупке", "Бесплатное ТО на 1 год"],
        }
      case "test-drive":
        return {
          title: "Запишитесь на тест-драйв!",
          subtitle: "Почувствуйте все преимущества автомобиля лично",
          icon: <Clock className="w-12 h-12 text-primary" />,
          benefits: ["Индивидуальный подход", "Удобное время", "Без обязательств"],
        }
      case "callback":
        return {
          title: "Заказать обратный звонок",
          subtitle: "Мы перезвоним вам в ближайшее время",
          icon: <Phone className="w-12 h-12 text-primary" />,
          benefits: ["Быстрый ответ", "Консультация специалиста", "Ответы на все вопросы"],
        }
      case "special-offer":
        return {
          title: "Получить специальное предложение",
          subtitle: "Узнайте о текущих акциях и скидках",
          icon: <Gift className="w-12 h-12 text-primary" />,
          benefits: ["Персональные условия", "Ограниченное предложение", "Максимальная выгода"],
        }
      default:
        return {
          title: "Оставить заявку",
          subtitle: "Мы свяжемся с вами в ближайшее время",
          icon: null,
          benefits: [],
        }
    }
  }

  const content = getFormContent()

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">{content.title}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center mb-4">
          {content.icon}
          <p className="text-center text-muted-foreground mt-2">{content.subtitle}</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">ФИО</Label>
            <Input
              id="name"
              placeholder="Введите ваше полное имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Номер телефона</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+7 (___) ___-____"
              value={phone}
              onChange={handlePhoneChange}
              required
            />
            {phoneError && <p className="text-sm text-red-500">{phoneError}</p>}
          </div>
          <div className="space-y-2">
            <ul className="list-disc list-inside text-sm text-muted-foreground">
              {content.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" checked={agreed} onCheckedChange={(checked) => setAgreed(checked as boolean)} />
            <label htmlFor="terms" className="text-sm text-muted-foreground">
              Я согласен на обработку персональных данных
            </label>
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full">
              Отправить заявку
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

