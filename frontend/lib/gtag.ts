// frontend/lib/gtag.ts
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || ""

// Отправка события pageview
export const pageview = (url: string) => {
  if (!GA_MEASUREMENT_ID) return
  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
  })
}

// Произвольные события
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string
  category: string
  label: string
  value: number
}) => {
  if (!GA_MEASUREMENT_ID) return
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}
