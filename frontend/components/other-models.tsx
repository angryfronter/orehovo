import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Model {
  brand: string
  model: string
  image: string
  price: number
  monthlyPayment: number
}

interface OtherModelsProps {
  brand: string
  models: Model[]
}

export default function OtherModels({ brand, models }: OtherModelsProps) {
  return (
    <section className="mb-8" aria-labelledby="other-models-title">
      <h2 id="other-models-title" className="text-2xl font-semibold mb-6">
        Другие модели {brand}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {models.map((model, index) => (
          <Card key={`${model.brand}-${model.model}-${index}`} className="border rounded-lg overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-square relative">
                <Image
                  src={model.image || "/placeholder.svg"}
                  alt={`${brand} ${model.model}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="p-4 space-y-2">
                <h3 className="text-xl font-bold">{model.model}</h3>
                <p className="font-semibold">от {model.price.toLocaleString()} ₽</p>
                <p className="text-sm text-muted-foreground">
                  В кредит от: {model.monthlyPayment.toLocaleString()} ₽/мес.
                </p>
                <Link href={`/catalog/${brand.toLowerCase()}/${model.model.toLowerCase()}`} className="block mt-4">
                  <Button variant="outline" className="w-full">
                    Подробнее
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

