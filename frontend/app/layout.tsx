import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Header from "@/components/header"
import Footer from "@/components/footer"
import "./globals.css"
import { cn } from "@/lib/utils"
import type React from "react" // Added import for React

const inter = Inter({ subsets: ["latin", "cyrillic"] })

export const metadata: Metadata = {
  title: "ДЦ Орехово - Автосалон в Москве",
  description: "Официальный дилер. Продажа и обслуживание автомобилей в Москве.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  themeColor: "#ffffff",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body
        className={cn(
          inter.className,
          "overflow-x-hidden min-h-screen flex flex-col antialiased",
          "text-base md:text-[16px] lg:text-[18px]",
        )}
      >
        <Header />
        <main className="flex-grow pt-16 md:pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

