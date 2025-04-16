import type React from "react"
import Image from "next/image"

interface LazyImageProps {
  src: string
  alt: string
  width: number
  height: number
}

export const LazyImage: React.FC<LazyImageProps> = ({ src, alt, width, height }) => {
  return (
    <Image
      src={src || "/placeholder.svg"}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      placeholder="blur"
      blurDataURL="/placeholder.svg"
    />
  )
}

