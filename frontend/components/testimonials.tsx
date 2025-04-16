"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Star } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    name: "Александр Ш.",
    rating: 5,
    date: "2 февраля 2024",
    text: "Отличный автосалон! Приобрел здесь BAIC X35. Менеджер Александр помог с выбором комплектации, подробно рассказал о всех нюансах. Особая благодарность руководителю отдела продаж Евгению за помощь в оформлении кредита, скидки и трейд-ин. Рекомендую этот салон, здесь реально помогают и заботятся о клиентах!",
    source: "Яндекс Карты",
    verified: true,
  },
  {
    name: "Сергей К.",
    rating: 5,
    date: "1 февраля 2024",
    text: "Покупал автомобиль в данном автосалоне, хочу поблагодарить менеджера Александра за профессионализм и чуткое отношение к клиенту. Всё было сделано быстро и качественно, никаких подводных камней, всё чётко и по делу. Отдельное спасибо Евгению за помощь в оформлении кредита. Рекомендую данный автосалон.",
    source: "Яндекс Карты",
    verified: true,
  },
  {
    name: "Андрей П.",
    rating: 5,
    date: "31 января 2024",
    text: "Хороший автосалон. Покупал здесь BAIC X35. Порадовало отношение менеджера к клиенту, грамотная консультация по автомобилю. Показали все варианты комплектации, дали тест-драйв. Особая благодарность руководителю отдела продаж за помощь в оформлении кредита. Рекомендую!",
    source: "Яндекс Карты",
    verified: true,
  },
  {
    name: "Дмитрий В.",
    rating: 5,
    date: "30 января 2024",
    text: "Приобретал автомобиль в кредит. Менеджер Александр помог с выбором комплектации, объяснил все нюансы. Процесс оформления документов прошёл быстро и без проблем. Отдельная благодарность Евгению за помощь с кредитом и скидками. Рекомендую этот салон всем, кто ищет честный подход к покупке авто.",
    source: "Яндекс Карты",
    verified: true,
  },
  {
    name: "Михаил Н.",
    rating: 5,
    date: "29 января 2024",
    text: "Очень доволен обслуживанием в автосалоне. Грамотные специалисты, которые действительно помогают с выбором. Особая благодарность менеджеру Александру за профессионализм и внимательность к деталям. Оформление прошло быстро, никаких скрытых комиссий или навязанных услуг.",
    source: "Яндекс Карты",
    verified: true,
  },
]

export default function Testimonials() {
  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Отзывы наших клиентов</h2>
        <div className="max-h-[600px] overflow-y-auto space-y-4 pr-4">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white">
              <CardHeader className="flex flex-row items-start space-x-4 p-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-xl font-semibold text-primary">{testimonial.name.charAt(0)}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <span className="text-sm text-muted-foreground">{testimonial.date}</span>
                  </div>
                  <div className="flex items-center mt-1">
                    <div className="flex mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < testimonial.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    {testimonial.verified && (
                      <span className="text-xs text-green-600 font-medium">Проверенный отзыв</span>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-gray-600 mb-2">{testimonial.text}</p>
                <div className="flex items-center mt-2">
                  <Image
                    src="https://yandex.ru/images/favicon.ico"
                    alt="Яндекс Карты"
                    width={16}
                    height={16}
                    className="mr-2"
                  />
                  <span className="text-sm text-muted-foreground">{testimonial.source}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

