import { useEffect, useState } from "react"

export function useGaAnalytics(startDate: string, endDate: string) {
  const [data, setData] = useState<{ 
    pageviews: any[]; 
    traffic_sources: any[]; 
    realtime_data: any[]; 
    daily_visitors: any[]; 
  }>({
    pageviews: [], 
    traffic_sources: [], 
    realtime_data: [], 
    daily_visitors: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch(`http://localhost:3000/api/analytics?start_date=${startDate}&end_date=${endDate}`)
      .then(res => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
      })
  }, [startDate, endDate])

  return { ...data, loading }
}
