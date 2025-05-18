"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import { fetchBanks } from "@/src/utils/api"

interface Bank {
  id: string
  name: string
  image_url?: string | null
}

export default function BankPartners() {
  const [banks, setBanks] = useState<Bank[]>([])

  useEffect(() => {
    const loadBanks = async () => {
      try {
        const data = await fetchBanks()
        setBanks(data.banks)
      } catch (error) {
        console.error("Ошибка загрузки банков:", error)
      }
    }

    loadBanks()
  }, [])

  return (
    <Card className="p-6">
      <h3 className="text-2xl font-bold mb-6">Наши банки-партнеры</h3>
      <p className="text-muted-foreground mb-8">
        Мы сотрудничаем с ведущими банками России, чтобы предложить вам лучшие условия автокредитования при Trade-in
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {banks
          .filter(bank => bank.image_url)
          .map((bank) => (
            <div
              key={bank.id}
              className="flex items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Image
                src={bank.image_url!}
                alt={bank.name}
                width={120}
                height={40}
                className="max-w-[120px] h-auto object-contain"
              />
            </div>
          ))}
      </div>
    </Card>
  )
}
