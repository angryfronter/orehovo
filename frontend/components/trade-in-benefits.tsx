import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, Clock, Calculator, ThumbsUp } from 'lucide-react'

const benefits = [
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: "Быстрая оценка",
    description: "Оценка вашего автомобиля за 30 минут"
  },
  {
    icon: <Clock className="h-8 w-8 text-primary" />,
    title: "Экономия времени",
    description: "Обмен автомобиля в день обращения"
  },
  {
    icon: <Calculator className="h-8 w-8 text-primary" />,
    title: "Выгодные условия",
    description: "Специальные цены на новые автомобили при обмене"
  },
  {
    icon: <ThumbsUp className="h-8 w-8 text-primary" />,
    title: "Гарантия качества",
    description: "Полная техническая проверка вашего автомобиля"
  }
]

export default function TradeInBenefits() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Преимущества Trade-in в ДЦ Орехово</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-primary/5 rounded-full w-fit">
                  {benefit.icon}
                </div>
                <CardTitle>{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

