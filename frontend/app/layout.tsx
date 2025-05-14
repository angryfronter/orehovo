import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Header from "@/components/header"
import Footer from "@/components/footer"
import "./globals.css"
import { cn } from "@/lib/utils"
import Script from "next/script"
import type React from "react"
import { GA_MEASUREMENT_ID } from "@/lib/gtag"
import { Analytics } from "@/app/analytics"

const inter = Inter({ subsets: ["latin", "cyrillic"] })

export const metadata: Metadata = {
  title: "ДЦ Орехово - Автосалон в Москве",
  description: "Официальный дилер. Продажа и обслуживание автомобилей в Москве.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  themeColor: "#ffffff",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className="scroll-smooth">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body
        className={cn(
          inter.className,
          "overflow-x-hidden min-h-screen flex flex-col antialiased",
          "text-base md:text-[16px] lg:text-[18px]",
        )}
      >
        <Header />
        <main className="flex-grow pt-16 md:pt-20">
          <Analytics />
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
