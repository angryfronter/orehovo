"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { cn } from "@/lib/utils"
import PhotoGallery from "@/components/photo-gallery"
import OtherModels from "@/components/other-models"
import { RequestForm } from "@/components/request-form"
import { PriceCalculator } from "@/components/price-calculator"

interface CarModelPageProps {
  brand: string
  model: string
  price: number
  discount: number
  monthlyPayment: number
  images: string[]
  specifications: Record<string, string>
  features: {
    comfort: string[]
    safety: string[]
    multimedia: string[]
  }
  configurations: Array<{
    name: string
    price: number
    features: string[]
  }>
  colors: Array<{
    name: string
    hex: string
  }>
  otherModels: any[]
}

export default function CarModelPage({
  brand,
  model,
  price,
  discount,
  monthlyPayment,
  images,
  specifications,
  features,
  configurations,
  colors,
  otherModels,
}: CarModelPageProps) {
  const [selectedColor, setSelectedColor] = useState(colors[0])
  // const [colorImages, setColorImages] = useState<string[]>(images[colors[0].name] || [])
  const [openForm, setOpenForm] = useState<"test-drive" | "purchase" | null>(null)

  const handleColorChange = (color: (typeof colors)[0]) => {
    setSelectedColor(color)
    // setColorImages(images[color.name] || [])
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div>
          <div className="relative aspect-video mb-4">
            <Image
              src={images[0] || "/placeholder.svg"}
              alt={`${brand} ${model}`}
              layout="fill"
              objectFit="contain"
              className="rounded-lg"
            />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold mb-2">Цвета</h3>
            <div className="flex gap-3">
              {colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => handleColorChange(color)}
                  className={cn(
                    "w-12 h-12 rounded-full transition-all",
                    // selectedColor.name === color.name ? "ring-2 ring-primary ring-offset-2" : "ring-1 ring-gray-200",
                  )}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                  aria-label={`Выбрать цвет ${color.name}`}
                  // aria-pressed={selectedColor.name === color.name}
                />
              ))}
            </div>
            {/* <p className="text-sm text-muted-foreground mt-2">Выбран цвет: {selectedColor.name}</p> */}
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-4">
            {brand} {model}
          </h1>
          <PriceCalculator
            basePrice={price}
            discount={discount}
            monthlyPayment={monthlyPayment}
            onTestDrive={() => setOpenForm("test-drive")}
            onPurchase={() => setOpenForm("purchase")}
          />
        </div>
      </div>

      <Tabs defaultValue="configurations" className="w-full mb-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="configurations">Комплектации</TabsTrigger>
          <TabsTrigger value="specifications">Характеристики</TabsTrigger>
        </TabsList>
        <TabsContent value="configurations" className="mt-6">
          <div className="space-y-4">
            {configurations.map((config) => {
              const configTotalSavings = 201000 // Total of all discounts
              const configFinalPrice = config.price - configTotalSavings
              const configMonthlyPayment = Math.round(configFinalPrice / 60)

              return (
                <Card key={config.name} className="overflow-hidden">
                  <CardContent className="p-0">
                    <Accordion type="single" collapsible>
                      <AccordionItem value={config.name}>
                        <AccordionTrigger className="px-4 py-2 hover:no-underline">
                          <div className="flex justify-between items-center w-full">
                            <span className="font-semibold">{config.name}</span>
                            <div className="text-right">
                              <div className="font-semibold">от {configFinalPrice.toLocaleString()} ₽</div>
                              <div className="text-sm text-muted-foreground">
                                {configMonthlyPayment.toLocaleString()} ₽/мес
                              </div>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="px-4 py-2 bg-muted/50">
                            <div className="mb-4">
                              <div className="text-sm text-muted-foreground mb-1">Выгода до</div>
                              <div className="font-semibold text-lg">{configTotalSavings.toLocaleString()} ₽</div>
                            </div>
                            <ul className="list-disc list-inside space-y-1">
                              {config.features.map((feature, index) => (
                                <li key={index}>{feature}</li>
                              ))}
                            </ul>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>
        <TabsContent value="specifications" className="mt-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {Object.entries(specifications).map(([key, value]) => (
              <div key={key} className="flex justify-between py-3 border-b last:border-0">
                <span className="text-muted-foreground">{key}</span>
                <span className="font-medium">{value}</span>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <PhotoGallery images={images} brand={brand} model={model} />

      {otherModels.length > 0 && (
        <OtherModels
          brand={brand}
          models={otherModels.map((model) => ({
            ...model,
            monthlyPayment: Math.round(model.price / 60),
          }))}
        />
      )}

      <RequestForm isOpen={openForm !== null} onClose={() => setOpenForm(null)} formType={openForm || "purchase"} />
    </div>
  )
}

