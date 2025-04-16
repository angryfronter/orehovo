'use client'

import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface Brand {
  id: string
  name: string
  logo: string
}

const brands: Brand[] = [
  { id: 'arcfox', name: 'ARCFOX', logo: '/placeholder.svg?height=30&width=60' },
  { id: 'baic', name: 'BAIC', logo: '/1f2bce898687aed77155e749df10dbca8216f452.png' },
  { id: 'belgee', name: 'BELGEE', logo: '/placeholder.svg?height=30&width=60' },
  { id: 'byd', name: 'BYD', logo: '/placeholder.svg?height=30&width=60' },
  { id: 'changan', name: 'CHANGAN', logo: '/placeholder.svg?height=30&width=60' },
  { id: 'chery', name: 'CHERY', logo: '/placeholder.svg?height=30&width=60' },
  { id: 'chevrolet', name: 'CHEVROLET', logo: '/placeholder.svg?height=30&width=60' },
  { id: 'citroen', name: 'CITROEN', logo: '/placeholder.svg?height=30&width=60' },
  { id: 'datsun', name: 'DATSUN', logo: '/placeholder.svg?height=30&width=60' },
  { id: 'dongfeng', name: 'DONGFENG', logo: '/placeholder.svg?height=30&width=60' },
  { id: 'exeed', name: 'EXEED', logo: '/placeholder.svg?height=30&width=60' },
  { id: 'faw', name: 'FAW', logo: '/placeholder.svg?height=30&width=60' },
  { id: 'forthing', name: 'FORTHING', logo: '/placeholder.svg?height=30&width=60' },
  { id: 'gac', name: 'GAC', logo: '/placeholder.svg?height=30&width=60' },
  { id: 'geely', name: 'GEELY', logo: '/placeholder.svg?height=30&width=60' },
  { id: 'greatwall', name: 'GREATWALL', logo: '/placeholder.svg?height=30&width=60' },
  { id: 'haima', name: 'HAIMA', logo: '/placeholder.svg?height=30&width=60' },
  { id: 'haval', name: 'HAVAL', logo: '/placeholder.svg?height=30&width=60' },
  { id: 'hongqi', name: 'HONGQI', logo: '/placeholder.svg?height=30&width=60' },
  { id: 'hyundai', name: 'HYUNDAI', logo: '/placeholder.svg?height=30&width=60' },
  { id: 'jac', name: 'JAC', logo: '/placeholder.svg?height=30&width=60' },
  { id: 'jaecoo', name: 'JAECOO', logo: '/placeholder.svg?height=30&width=60' },
  { id: 'jetour', name: 'JETOUR', logo: '/placeholder.svg?height=30&width=60' },
  { id: 'jetta', name: 'JETTA', logo: '/placeholder.svg?height=30&width=60' },
  { id: 'xcite', name: 'XCITE', logo: '/placeholder.svg?height=30&width=60' },
]

interface BrandSelectorProps {
  selectedBrand: string | null
  onSelectBrand: (brandId: string | null) => void
}

export default function BrandSelector({ selectedBrand, onSelectBrand }: BrandSelectorProps) {
  const [scrollPosition, setScrollPosition] = useState(0)
  const scrollAmount = 200

  const scroll = (direction: 'left' | 'right') => {
    const container = document.getElementById('brand-scroll-container')
    if (container) {
      const newPosition = direction === 'left' 
        ? Math.max(0, scrollPosition - scrollAmount)
        : Math.min(container.scrollWidth - container.clientWidth, scrollPosition + scrollAmount)
      container.scrollTo({ left: newPosition, behavior: 'smooth' })
      setScrollPosition(newPosition)
    }
  }

  return (
    <div className="relative bg-white rounded-lg shadow-md p-4 mb-8">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => scroll('left')}
          className="absolute left-2 z-10"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <div
          id="brand-scroll-container"
          className="flex overflow-x-hidden scroll-smooth gap-4 px-8"
        >
          {brands.map((brand) => (
            <button
              key={brand.id}
              onClick={() => onSelectBrand(selectedBrand === brand.id ? null : brand.id)}
              className={cn(
                "flex flex-col items-center min-w-[100px] p-2 rounded-lg transition-colors",
                selectedBrand === brand.id ? "bg-gray-100" : "hover:bg-gray-50"
              )}
            >
              <Image
                src={brand.logo}
                alt={brand.name}
                width={60}
                height={30}
                className="mb-2"
              />
              <span className="text-sm font-medium">{brand.name}</span>
            </button>
          ))}
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => scroll('right')}
          className="absolute right-2 z-10"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

