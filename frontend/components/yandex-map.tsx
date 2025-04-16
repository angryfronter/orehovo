"use client"

import { useEffect, useState } from "react"
import Script from "next/script"

interface YandexMapProps {
  center: [number, number]
  zoom: number
}

declare global {
  interface Window {
    ymaps: any
  }
}

export default function YandexMap({ center, zoom }: YandexMapProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (!isLoaded) return

    const init = () => {
      const map = new window.ymaps.Map("map", {
        center: center,
        zoom: zoom,
        controls: ["zoomControl", "fullscreenControl"],
      })

      const placemark = new window.ymaps.Placemark(
        center,
        {
          balloonContent: "ДЦ Орехово - Автосалон",
          hintContent: "ДЦ Орехово",
        },
        {
          preset: "islands#redAutoIcon",
        },
      )

      map.geoObjects.add(placemark)
    }

    window.ymaps.ready(init).catch((error) => {
      console.error("Error initializing Yandex Map:", error)
    })
  }, [center, zoom, isLoaded])

  return (
    <>
      <Script
        src="https://api-maps.yandex.ru/2.1/?apikey=YOUR_YANDEX_MAPS_API_KEY&lang=ru_RU"
        onLoad={() => setIsLoaded(true)}
      />
      <div id="map" className="w-full h-[500px] rounded-lg" />
    </>
  )
}

