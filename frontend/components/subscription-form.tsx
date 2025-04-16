"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Mail } from "lucide-react"

interface SubscriptionFormProps {
  isOpen: boolean
  onClose: () => void
}

export function SubscriptionForm({ isOpen, onClose }: SubscriptionFormProps) {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Here you would typically send the email to your backend
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsSuccess(true)
      setTimeout(() => {
        onClose()
        setIsSuccess(false)
        setEmail("")
      }, 2000)
    } catch (error) {
      console.error("Error subscribing:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            Подписка на новости
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Введите ваш email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Подписавшись на рассылку, вы будете получать информацию о новых автомобилях, акциях и специальных
            предложениях.
          </p>
          <DialogFooter>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSuccess ? "Готово!" : isSubmitting ? "Подписываем..." : "Подписаться"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

