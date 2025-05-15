import { useEffect, useState } from "react"
import { fetchCarStats } from "@/src/utils/api"

type CarStats = {
  total: number
  hot: number
  visible: number
}

export function useCarStats() {
  const [stats, setStats] = useState<CarStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await fetchCarStats()
        setStats(data)
      } catch (err) {
        console.error("Ошибка при загрузке статистики авто", err)
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [])

  return { stats, loading }
}
