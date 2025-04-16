"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { SubscriptionForm } from "./subscription-form"
import { ContactForm } from "./contact-form"

const Footer = () => {
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false)
  const [isContactOpen, setIsContactOpen] = useState(false)

  return (
    <footer className="bg-gray-100 py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">ДЦ Орехово</h3>
            <p className="text-sm text-muted-foreground">
              Официальный дилер. Продажа и обслуживание автомобилей в Москве.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Контакты</h3>
            <div className="space-y-2 text-sm">
              <p>Телефон: +7 (495) 495-95-95</p>
              <p>Адрес: г. Москва, Ореховый бульвар, 26</p>
              <p>Email: info@dc-orehovo.ru</p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Навигация</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/catalog" className="hover:text-primary transition-colors">
                  Каталог
                </Link>
              </li>
              <li>
                <Link href="/credit" className="hover:text-primary transition-colors">
                  Автокредит
                </Link>
              </li>
              <li>
                <Link href="/trade-in" className="hover:text-primary transition-colors">
                  Trade-in
                </Link>
              </li>
              <li>
                <Link href="/promotions" className="hover:text-primary transition-colors">
                  Акции
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Мы в соцсетях</h3>
            <div className="flex space-x-4">
              <a
                href="https://vk.com/club229260462"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <Image
                  src="https://thumb.cloud.mail.ru/weblink/thumb/xw1/TfKk/QGyS93cW7/PNG%20-%20digital/VK%20Logo%20Black%20%26%20White.png"
                  alt="VK"
                  width={24}
                  height={24}
                />
              </a>
              <a
                href="https://dzen.ru/dcorehovo"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <Image
                  src="https://dzen.ru/about/images/download/dzen-dark/dark-icon.svg"
                  alt="Дзен"
                  width={24}
                  height={24}
                />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="outline" onClick={() => setIsSubscriptionOpen(true)} className="w-full sm:w-auto">
              Подписаться на новости
            </Button>
            <Button variant="default" onClick={() => setIsContactOpen(true)} className="w-full sm:w-auto">
              Связаться с нами
            </Button>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-muted-foreground">
          <p>&copy; 2023 ДЦ Орехово. Все права защищены.</p>
        </div>
      </div>

      <SubscriptionForm isOpen={isSubscriptionOpen} onClose={() => setIsSubscriptionOpen(false)} />
      <ContactForm isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </footer>
  )
}

export default Footer

