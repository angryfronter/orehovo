import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function AssistanceForm() {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Нужна помощь с выбором автомобиля?</CardTitle>
        <CardDescription>Мы поможем Вам с подбором! Оставьте заявку, и мы перезвоним Вам в ближайшее время!</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <Input placeholder="Ф.И.О." />
          <Input placeholder="+7 (___) - ___ - __ - __" type="tel" />
          <div className="flex items-center space-x-2">
            <Checkbox id="terms2" />
            <label htmlFor="terms2" className="text-sm">
              Согласен на обработку персональных данных
            </label>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Отправить заявку</Button>
      </CardFooter>
    </Card>
  )
}

