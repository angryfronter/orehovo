import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const steps = [
  {
    number: "01",
    title: "Оценка автомобиля",
    description: "Наши эксперты проведут бесплатную оценку вашего автомобиля"
  },
  {
    number: "02",
    title: "Выбор нового авто",
    description: "Подберем для вас идеальный новый автомобиль из нашего каталога"
  },
  {
    number: "03",
    title: "Оформление документов",
    description: "Быстро и удобно оформим все необходимые документы"
  },
  {
    number: "04",
    title: "Получение нового авто",
    description: "Вы уезжаете на новом автомобиле в день обращения"
  }
]

export default function TradeInProcess() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Как работает Trade-in</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="relative overflow-hidden">
              <div className="absolute top-0 left-0 bg-primary text-white text-5xl font-bold p-4 rounded-br-lg">
                {step.number}
              </div>
              <CardHeader className="pt-20">
                <CardTitle>{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

