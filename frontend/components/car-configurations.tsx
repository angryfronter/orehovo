"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, CreditCard, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { RequestForm } from "@/components/request-form"

interface Configuration {
  name: string
  engine: string
  transmission: string
  drivetrain: string
  price: number
  features: string[]
}

interface CarConfigurationsProps {
  configurations?: Configuration[]
}

export default function CarConfigurations({ configurations }: CarConfigurationsProps) {
  const [expandedConfig, setExpandedConfig] = useState<string | null>(null)
  const [openForm, setOpenForm] = useState<"credit" | "trade-in" | null>(null)

  if (!configurations || configurations.length === 0) {
    return <p>Информация о комплектациях недоступна</p>
  }

  const toggleConfig = (name: string) => {
    setExpandedConfig(expandedConfig === name ? null : name)
  }

  return (
    <div className="space-y-4">
      {configurations?.map((config) => (
        <Card key={config.name} className="relative overflow-hidden border-2 hover:border-primary/50 transition-colors">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-xl">{config.name}</CardTitle>
                  {config.name === "Luxury" && (
                    <Badge variant="default" className="bg-primary">
                      Популярный выбор
                    </Badge>
                  )}
                </div>
                <CardDescription className="text-base">
                  {config.engine} • {config.transmission} • {config.drivetrain}
                </CardDescription>
              </div>
              <Button variant="ghost" size="icon" onClick={() => toggleConfig(config.name)} className="shrink-0">
                {expandedConfig === config.name ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </Button>
            </div>
          </CardHeader>

          <CardContent className="pb-4">
            <div className="space-y-4">
              <div>
                <p className="text-3xl font-bold">от {config.price.toLocaleString()} ₽</p>
                <p className="text-muted-foreground">
                  В кредит от {Math.round(config.price / 60).toLocaleString()} ₽/мес.
                </p>
              </div>

              {expandedConfig === config.name && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <h4 className="font-semibold">Особенности комплектации:</h4>
                    <ul className="grid gap-2">
                      {config.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <span className="mr-2 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col sm:flex-row gap-2">
            <Button className="w-full sm:w-auto" onClick={() => setOpenForm("credit")}>
              <CreditCard className="mr-2 h-4 w-4" />
              Рассчитать кредит
            </Button>
            <Button variant="outline" className="w-full sm:w-auto" onClick={() => setOpenForm("trade-in")}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Trade-In
            </Button>
          </CardFooter>
        </Card>
      ))}

      <RequestForm isOpen={openForm !== null} onClose={() => setOpenForm(null)} formType={openForm || "credit"} />
    </div>
  )
}

