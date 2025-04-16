import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Car, CreditCard, Megaphone, FileText, Users, Settings, BarChart, CalendarDays } from "lucide-react"

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Панель управления</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/admin/cars">
          <Card className="hover:bg-gray-100 transition-colors cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-2xl font-bold">Автомобили</CardTitle>
              <Car className="h-6 w-6 text-gray-500" />
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Управление каталогом автомобилей</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/promotions">
          <Card className="hover:bg-gray-100 transition-colors cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-2xl font-bold">Акции</CardTitle>
              <Megaphone className="h-6 w-6 text-gray-500" />
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Управление акциями и спецпредложениями</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/credit-programs">
          <Card className="hover:bg-gray-100 transition-colors cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-2xl font-bold">Кредитные программы</CardTitle>
              <CreditCard className="h-6 w-6 text-gray-500" />
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Управление кредитными программами</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/content">
          <Card className="hover:bg-gray-100 transition-colors cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-2xl font-bold">Контент</CardTitle>
              <FileText className="h-6 w-6 text-gray-500" />
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Управление контентом сайта</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/users">
          <Card className="hover:bg-gray-100 transition-colors cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-2xl font-bold">Пользователи</CardTitle>
              <Users className="h-6 w-6 text-gray-500" />
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Управление пользователями и ролями</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/settings">
          <Card className="hover:bg-gray-100 transition-colors cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-2xl font-bold">Настройки</CardTitle>
              <Settings className="h-6 w-6 text-gray-500" />
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Общие настройки сайта</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/analytics">
          <Card className="hover:bg-gray-100 transition-colors cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-2xl font-bold">Аналитика</CardTitle>
              <BarChart className="h-6 w-6 text-gray-500" />
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Просмотр статистики и отчетов</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/events">
          <Card className="hover:bg-gray-100 transition-colors cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-2xl font-bold">События</CardTitle>
              <CalendarDays className="h-6 w-6 text-gray-500" />
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Управление мероприятиями и тест-драйвами</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}

