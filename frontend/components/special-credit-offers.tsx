"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

const offers = [
  {
    id: 1,
    title: "Семейный автомобиль",
    description: "Специальная программа для семей с детьми",
    rate: "от 4.9%",
    term: "до 84 мес.",
    downPayment: "от 0%",
    highlight: "Господдержка",
    details: {
      requirements: ["Наличие несовершеннолетних детей", "Российское гражданство", "Первый автомобиль в собственности"],
      benefits: ["Сниженная процентная ставка", "Отсрочка первого платежа на 3 месяца", "Страхование КАСКО в подарок"],
    },
  },
  {
    id: 2,
    title: "Первый автомобиль",
    description: "Программа для покупателей первого автомобиля",
    rate: "от 8.3%",
    term: "до 60 мес.",
    downPayment: "от 10%",
    highlight: "Господдержка",
    details: {
      requirements: [
        "Отсутствие автомобиля в собственности",
        "Российское гражданство",
        "Наличие водительского удостоверения",
      ],
      benefits: ["Специальная процентная ставка", "Минимальный первый взнос", "Быстрое одобрение"],
    },
  },
  {
    id: 3,
    title: "Быстрое решение",
    description: "Кредит по двум документам",
    rate: "от 18%",
    term: "до 84 мес.",
    downPayment: "от 20%",
    highlight: "Без подтверждения дохода",
    details: {
      requirements: ["Паспорт", "Водительское удостоверение", "Возраст от 21 года"],
      benefits: ["Решение за 30 минут", "Упрощенный пакет документов", "Досрочное погашение без штрафов"],
    },
  },
]

export default function SpecialCreditOffers() {
  const [selectedOffer, setSelectedOffer] = useState<(typeof offers)[0] | null>(null)

  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Специальные предложения</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Выберите программу кредитования, которая подходит именно вам
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <Card key={offer.id} className="relative overflow-hidden hover:shadow-lg transition-shadow">
            {offer.highlight && (
              <div className="absolute top-4 right-4 bg-primary text-white text-sm px-3 py-1 rounded-full">
                {offer.highlight}
              </div>
            )}
            <CardHeader className="space-y-4 pt-8">
              <CardTitle className="text-xl">{offer.title}</CardTitle>
              <p className="text-muted-foreground min-h-[48px]">{offer.description}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Ставка</p>
                    <p className="font-semibold">{offer.rate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Срок</p>
                    <p className="font-semibold">{offer.term}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Первый взнос</p>
                    <p className="font-semibold">{offer.downPayment}</p>
                  </div>
                </div>
                <Button
                  className="w-full bg-primary text-white hover:bg-primary/90 group"
                  onClick={() => setSelectedOffer(offer)}
                >
                  Подробнее
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={selectedOffer !== null} onOpenChange={() => setSelectedOffer(null)}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedOffer && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 mb-2">
                  <DialogTitle className="text-2xl">{selectedOffer.title}</DialogTitle>
                  <Badge variant="default">{selectedOffer.highlight}</Badge>
                </div>
                <DialogDescription className="text-base">{selectedOffer.description}</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-3 gap-4 py-4">
                <div>
                  <p className="text-sm text-muted-foreground">Ставка</p>
                  <p className="font-semibold">{selectedOffer.rate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Срок</p>
                  <p className="font-semibold">{selectedOffer.term}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Первый взнос</p>
                  <p className="font-semibold">{selectedOffer.downPayment}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold mb-2">Требования:</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    {selectedOffer.details.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Преимущества:</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    {selectedOffer.details.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-6">
                <Button className="w-full" size="lg">
                  Оформить заявку
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}

