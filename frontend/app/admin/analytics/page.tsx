"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { useGaAnalytics } from "@/hooks/useGaAnalytics"
import { useCarStats } from "@/hooks/useCarStats"
import { usePromotionStats } from "@/hooks/usePromotionStats"

export default function AnalyticsPage() {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date())
  const [endDate, setEndDate] = useState<Date | undefined>(new Date())
  const startDateStr = startDate?.toISOString().split("T")[0] || ""
  const endDateStr = endDate?.toISOString().split("T")[0] || ""
  const { pageviews, traffic_sources, realtime_data, daily_visitors, loading } = useGaAnalytics(startDateStr, endDateStr)
  const { stats: carStats, loading: loadingCarStats } = useCarStats()
  const { stats: promotionStats, loading: loadingPromotionStats } = usePromotionStats()

  const SOURCE_LABELS: Record<string, string> = {
    "(direct)": "Прямой заход",
    "(not set)": "Источник не определён"
  }

  function formatSource(source: string): string {
    return SOURCE_LABELS[source] || source
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Аналитика</h1>

      <div className="flex space-x-4 items-end">
        <div>
          <Label htmlFor="start-date">Начальная дата</Label>
          <Input
            id="start-date"
            type="date"
            value={startDate ? startDate.toISOString().split("T")[0] : ""}
            onChange={(e) => setStartDate(new Date(e.target.value))}
          />
        </div>
        <div>
          <Label htmlFor="end-date">Конечная дата</Label>
          <Input
            id="end-date"
            type="date"
            value={endDate ? endDate.toISOString().split("T")[0] : ""}
            onChange={(e) => setEndDate(new Date(e.target.value))}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Всего посетителей</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading
                ? "Загрузка..."
                : daily_visitors.reduce((acc, cur) => acc + cur.visitors, 0).toLocaleString("ru-RU")}
            </div>
            {/* <p className="text-xs text-muted-foreground">+12.5% с прошлого месяца</p> */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Количество авто</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M3 13l1.5-4.5A2 2 0 0 1 6.4 7h11.2a2 2 0 0 1 1.9 1.5L21 13v5a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H6v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-5z" />
                <circle cx="7.5" cy="17.5" r="1.5" />
                <circle cx="16.5" cy="17.5" r="1.5" />
              </svg>
          </CardHeader>
          <CardContent className="space-y-1">
            {loadingCarStats || !carStats ? (
              <div className="text-sm text-muted-foreground">Загрузка...</div>
            ) : (
              <>
                <div className="text-2xl font-bold">{carStats.total}</div>
                <div className="text-xs text-muted-foreground">Горящие предложения: <span className="font-bold">{carStats.hot}</span></div>
                <div className="text-xs text-muted-foreground">Активные(видимые): <span className="font-bold">{carStats.visible}</span></div>
              </>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Акции</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 text-muted-foreground"
              >
                <line x1="19" y1="5" x2="5" y2="19" />
                <circle cx="6.5" cy="6.5" r="2.5" />
                <circle cx="17.5" cy="17.5" r="2.5" />
              </svg>
          </CardHeader>
          <CardContent className="space-y-1">
            {loadingPromotionStats || !promotionStats ? (
              <div className="text-sm text-muted-foreground">Загрузка...</div>
            ) : (
              <>
                <div className="text-2xl font-bold">{promotionStats.total}</div>

                <div className="text-xs text-muted-foreground font-bold">
                  Активные (видимые): <span className="font-bold">{promotionStats.visible.length}</span>
                </div>
                <div className="text-xs text-muted-foreground space-y-1">
                  {promotionStats.visible.map((title: string, index: number) => (
                    <div key={index}>{title}</div>
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Продажи</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">345</div>
            <p className="text-xs text-muted-foreground">+8.2% с прошлого месяца</p>
          </CardContent>
        </Card>
        {/* <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Средний чек</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,345,000 ₽</div>
            <p className="text-xs text-muted-foreground">+1.5% с прошлого месяца</p>
          </CardContent>
        </Card> */}
        {/* <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Конверсия</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="m16 18 2-2v-3" />
              <path d="M8 18 l-2-2v-3" />
              <path d="M12 8v8" />
              <path d="m16 10-4-2-4 2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.46%</div>
            <p className="text-xs text-muted-foreground">+0.1% с прошлого месяца</p>
          </CardContent>
        </Card> */}


        <Card>
          <CardHeader>
            <CardTitle>Просмотры страниц</CardTitle>
          </CardHeader>
          <CardContent>
          {loading ? (
              <div className="text-sm text-muted-foreground">Загрузка...</div>
            ) : (
              <ul className="space-y-1 text-xs text-muted-foreground">
                {pageviews.map((p) => (
                  <li key={p.page}>
                    <span>{p.page}</span>: <span className="font-bold">{p.views}</span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>


        <Card>
          <CardHeader>
            <CardTitle>Источники трафика</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-sm text-muted-foreground">Загрузка...</div>
            ) : (
              <ul className="space-y-1 text-xs text-muted-foreground">
                {traffic_sources.map((s) => (
                  <li key={s.source}>
                    <span>{formatSource(s.source)}</span>: <span className="font-bold">{s.sessions}</span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Кол-во онлайн посетителей</CardTitle>
          </CardHeader>
          <CardContent>
          {loading ? (
              <div className="text-sm text-muted-foreground">Загрузка...</div>
            ) : (
              <ul className="space-y-1 text-xs text-muted-foreground">
                {realtime_data.map((s) => (
                  <li key={s.source}>
                    <span>{s.screen}</span>: <span className="font-bold">{s.active_users}</span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="visitors" className="space-y-4">
        <TabsList>
          <TabsTrigger value="visitors">Посетители</TabsTrigger>
          <TabsTrigger value="sales">Продажи</TabsTrigger>
        </TabsList>
        <TabsContent value="visitors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Посетители</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              {loading ? (
                <div className="text-sm text-muted-foreground px-4 py-10">Загрузка графика...</div>
              ) : (
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={daily_visitors.map(d => ({
                    name: new Date(d.date).toLocaleDateString("ru-RU", { day: "2-digit", month: "short" }),
                    visitors: d.visitors
                  }))}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="visitors" stroke="#8884d8" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        {/* <TabsContent value="sales" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Продажи</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="sales" stroke="#82ca9d" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent> */}
      </Tabs>
    </div>
  )
}

