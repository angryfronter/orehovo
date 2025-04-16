'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function PromotionSubscribe() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the email to your backend
    console.log('Subscribed with email:', email)
    setEmail('')
    // Show a success message to the user
  }

  return (
    <Card className="mt-16 bg-primary text-primary-foreground">
      <CardHeader>
        <CardTitle className="text-2xl">Получайте эксклюзивные предложения</CardTitle>
        <CardDescription className="text-primary-foreground/80">
          Подпишитесь на нашу рассылку и первыми узнавайте о новых акциях и специальных предложениях
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex gap-4">
          <Input
            type="email"
            placeholder="Ваш email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-primary-foreground text-primary"
          />
          <Button type="submit" variant="secondary">Подписаться</Button>
        </form>
      </CardContent>
    </Card>
  )
}

