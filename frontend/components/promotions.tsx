import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function Promotions() {
  const promotions = [
    { title: 'Зимняя резина в подарок', description: 'При покупке любого автомобиля' },
    { title: 'Страховка в подарок', description: 'При оформлении кредита' },
    { title: '3 платежа по кредиту в подарок', description: 'При покупке автомобиля в кредит' },
    { title: 'Госпрограммы со скидкой 20%', description: 'Для определенных категорий покупателей' },
  ]

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Акции и спецпредложения</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {promotions.map((promo, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{promo.title}</CardTitle>
              <CardDescription>{promo.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button variant="outline">Подробнее</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

