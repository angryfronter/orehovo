import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Shield, Clock, BadgePercent, FileCheck } from 'lucide-react'

const benefits = [
  {
    icon: <Clock className="h-8 w-8 text-primary" />,
    title: "Быстрое решение",
    description: "Предварительное решение за 30 минут по паспорту"
  },
  {
    icon: <BadgePercent className="h-8 w-8 text-primary" />,
    title: "Выгодные условия",
    description: "Ставка от 3.9% годовых с первым взносом от 0%"
  },
  {
    icon: <Shield className="h-8 w-8 text-primary" />,
    title: "Без КАСКО",
    description: "Возможность оформления кредита без страхования КАСКО"
  },
  {
    icon: <FileCheck className="h-8 w-8 text-primary" />,
    title: "Простое оформление",
    description: "Минимальный пакет документов и удобный процесс"
  }
]

export default function CreditBenefits() {
  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Преимущества автокредита</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Выгодные условия кредитования и профессиональная поддержка на всех этапах оформления
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((benefit) => (
          <Card key={benefit.title} className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto mb-4 p-3 bg-primary/5 rounded-full w-fit">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold">{benefit.title}</h3>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{benefit.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

