"use client"

import { useState, useCallback, useMemo } from "react"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface PhotoGalleryProps {
  images: { [colorName: string]: string[] }
  brand: string
  model: string
}

export default function PhotoGallery({ images, brand, model }: PhotoGalleryProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const allImages = useMemo(() => {
    if (!images || typeof images !== "object") return []
    return Object.values(images).flat()
  }, [images])

  const handlePrevious = useCallback(() => {
    setCurrentImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1))
  }, [allImages.length])

  const handleNext = useCallback(() => {
    setCurrentImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1))
  }, [allImages.length])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrevious()
      } else if (e.key === "ArrowRight") {
        handleNext()
      } else if (e.key === "Escape") {
        setIsOpen(false)
      }
    },
    [handlePrevious, handleNext],
  )

  const openGallery = useCallback((index: number) => {
    setCurrentImageIndex(index)
    setIsOpen(true)
  }, [])

  return (
    <section className="mb-8" aria-labelledby="photo-gallery-title">
      <h2 id="photo-gallery-title" className="text-2xl font-semibold mb-4">
        Фотогалерея
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {allImages.map((image, index) => (
          <button
            key={index}
            onClick={() => openGallery(index)}
            className="relative aspect-[4/3] overflow-hidden rounded-lg group"
            aria-label={`Открыть фото ${index + 1} из ${allImages.length}`}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`${brand} ${model} - фото ${index + 1}`}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        ))}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-[90vw] h-[90vh] p-0 bg-black/90" onKeyDown={handleKeyDown}>
          <div className="relative w-full h-full flex items-center justify-center">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-50 text-white hover:bg-white/20"
              onClick={() => setIsOpen(false)}
              aria-label="Закрыть галерею"
            >
              <X className="h-6 w-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className={cn("absolute left-4 z-50 text-white hover:bg-white/20", "hidden md:flex")}
              onClick={handlePrevious}
              aria-label="Предыдущее фото"
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className={cn("absolute right-4 z-50 text-white hover:bg-white/20", "hidden md:flex")}
              onClick={handleNext}
              aria-label="Следующее фото"
            >
              <ChevronRight className="h-8 w-8" />
            </Button>

            <div className="relative w-full h-full flex items-center justify-center p-4">
              <Image
                src={allImages[currentImageIndex] || "/placeholder.svg"}
                alt={`${brand} ${model} - фото ${currentImageIndex + 1}`}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </div>

            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1 md:hidden">
              {allImages.map((_, index) => (
                <div
                  key={index}
                  className={cn("w-1.5 h-1.5 rounded-full", index === currentImageIndex ? "bg-white" : "bg-white/50")}
                />
              ))}
            </div>

            <div className="absolute bottom-4 right-4 bg-black/50 px-3 py-1 rounded-full text-white text-sm">
              {currentImageIndex + 1} / {allImages.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}

