import { useEffect, useState } from "react"
import { fetchPromotionStats } from "@/src/utils/api"

type PromotionStats = {
  total: number
  visible: string[]
}

export function usePromotionStats() {
  const [stats, setStats] = useState<PromotionStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await fetchPromotionStats()
        setStats(data)
      } catch (err) {
        console.error("Ошибка при загрузке статистики акций", err)
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [])

  return { stats, loading }
}
