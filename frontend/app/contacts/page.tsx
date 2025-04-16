import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, MapPin, Phone, Mail } from "lucide-react"
import dynamic from "next/dynamic"

const YandexMap = dynamic(() => import("@/components/yandex-map"), { ssr: false })

export const metadata: Metadata = {
  title: "Контакты | ДЦ Орехово",
  description: "Контактная информация автосалона ДЦ Орехово. Адрес, телефон, схема проезда.",
}

export default function ContactsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Контакты</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Контактная информация</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold">Адрес</h3>
                  <p className="text-muted-foreground">115582, г. Москва, Ореховый бульвар, 26</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold">Телефон</h3>
                  <p className="text-muted-foreground">
                    <a href="tel:+74954959595" className="hover:text-primary">
                      +7 (495) 495-95-95
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-muted-foreground">
                    <a href="mailto:info@dc-orehovo.ru" className="hover:text-primary">
                      info@dc-orehovo.ru
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold">Режим работы</h3>
                  <p className="text-muted-foreground">Ежедневно с 9:00 до 21:00</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Как добраться</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                <strong>На автомобиле:</strong> Съезд с МКАД 24 км внутр. на Каширское шоссе по направлению в центр,
                через 800 метров съезд с дублера на Ясеневскую улицу направо, 2 км по прямой до пересечения с Ореховым
                бульваром у метро Красногвардейская, на светофоре направо и по прямой 600 метров, до указателя ДЦ
                Орехово.
              </p>
              <p className="text-muted-foreground">
                <strong>На метро:</strong> Станция метро "Красногвардейская", выход номер 3 к Ореховому бульвару, далее
                пешком 5 минут вдоль Орехового бульвара до указателя.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Схема проезда</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[500px]">
              <YandexMap center={[55.613012, 37.754054]} zoom={15} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

