import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Award, ThumbsUp, Wallet, Percent } from 'lucide-react'

const reasons = [
  {
    icon: <Award className="h-8 w-8 text-primary" />,
    title: 'Широкий выбор',
    description: 'Более 1000 моделей автомобилей в наличии'
  },
  {
    icon: <ThumbsUp className="h-8 w-8 text-primary" />,
    title: 'Гарантия качества',
    description: 'Все автомобили проходят тщательную проверку'
  },
  {
    icon: <Wallet className="h-8 w-8 text-primary" />,
    title: 'Выгодные условия',
    description: 'Лучшие цены и специальные предложения'
  },
  {
    icon: <Percent className="h-8 w-8 text-primary" />,
    title: 'Низкие ставки по кредиту',
    description: 'Кредит от 3.9% годовых с первым взносом от 0%'
  }
]

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Почему выбирают нас</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="mb-4">{reason.icon}</div>
                <CardTitle>{reason.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{reason.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

