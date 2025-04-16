"use client"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface Configuration {
  name: string
  price: number
  features: string[]
}

interface Specifications {
  [key: string]: string
}

interface CarDetailsProps {
  configurations: Configuration[]
  specifications: Specifications
}

export function CarDetails({ configurations, specifications }: CarDetailsProps) {
  return (
    <div className="space-y-8">
      <Tabs defaultValue="configurations" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="configurations">Комплектации</TabsTrigger>
          <TabsTrigger value="specifications">Характеристики</TabsTrigger>
        </TabsList>

        <TabsContent value="configurations" className="space-y-4">
          <Accordion type="single" collapsible className="space-y-2">
            {configurations.map((config) => (
              <AccordionItem key={config.name} value={config.name} className="border rounded-lg overflow-hidden">
                <AccordionTrigger className="px-4 py-3 hover:no-underline">
                  <div className="flex justify-between items-center w-full">
                    <span className="font-semibold">{config.name}</span>
                    <span className="font-semibold">от {config.price.toLocaleString()} ₽</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="p-4 bg-gray-50">
                    <ul className="list-disc list-inside space-y-2">
                      {config.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>

        <TabsContent value="specifications">
          <Table>
            <TableBody>
              {Object.entries(specifications).map(([key, value]) => (
                <TableRow key={key}>
                  <TableCell className="font-medium">{key}</TableCell>
                  <TableCell>{value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </div>
  )
}

