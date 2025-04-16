import { Card } from "@/components/ui/card"
import Image from "next/image"

const banks = [
  { name: "Сбербанк", logo: "/hhttps://storage.yandexcloud.net/sh-mainold/mainold/media/sber/placeholder_vertical.jpg?height=40&width=120" },
  { name: "ВТБ", logo: "/placeholder.svg?height=40&width=120" },
  { name: "Альфа-Банк", logo: "/placeholder.svg?height=40&width=120" },
  { name: "Газпромбанк", logo: "/placeholder.svg?height=40&width=120" },
  { name: "Тинькофф Банк", logo: "/placeholder.svg?height=40&width=120" },
  { name: "Райффайзен Банк", logo: "/placeholder.svg?height=40&width=120" },
]

export default function BankPartners() {
  return (
    <Card className="p-6">
      <h3 className="text-2xl font-bold mb-6">Наши банки-партнеры</h3>
      <p className="text-muted-foreground mb-8">
        Мы сотрудничаем с ведущими банками России, чтобы предложить вам лучшие условия автокредитования при Trade-in
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {banks.map((bank) => (
          <div key={bank.name} className="flex items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <Image
              src={bank.logo}
              alt={bank.name}
              width={120}
              height={40}
              className="max-w-[120px] h-auto"
            />
          </div>
        ))}
      </div>
    </Card>
  )
}

