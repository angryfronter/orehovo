import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Car, CreditCard, LayoutDashboard, Megaphone, FileText, Settings, BarChart, CalendarDays } from "lucide-react"
import type React from "react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <nav className="p-5 space-y-2">
          <Link href="/admin">
            <Button variant="ghost" className="w-full justify-start">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Дашборд
            </Button>
          </Link>
          <Link href="/admin/cars">
            <Button variant="ghost" className="w-full justify-start">
              <Car className="mr-2 h-4 w-4" />
              Автомобили
            </Button>
          </Link>
          <Link href="/admin/promotions">
            <Button variant="ghost" className="w-full justify-start">
              <Megaphone className="mr-2 h-4 w-4" />
              Акции
            </Button>
          </Link>
          <Link href="/admin/credit-programs">
            <Button variant="ghost" className="w-full justify-start">
              <CreditCard className="mr-2 h-4 w-4" />
              Кредитные программы
            </Button>
          </Link>
          <Link href="/admin/settings">
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="mr-2 h-4 w-4" />
              Настройки
            </Button>
          </Link>
          <Link href="/admin/analytics">
            <Button variant="ghost" className="w-full justify-start">
              <BarChart className="mr-2 h-4 w-4" />
              Аналитика
            </Button>
          </Link>
          <Link href="/admin/events">
            <Button variant="ghost" className="w-full justify-start">
              <CalendarDays className="mr-2 h-4 w-4" />
              События
            </Button>
          </Link>
          {/* <Link href="/admin/content">
            <Button variant="ghost" className="w-full justify-start">
              <FileText className="mr-2 h-4 w-4" />
              Контент
            </Button>
          </Link> */}
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  )
}

