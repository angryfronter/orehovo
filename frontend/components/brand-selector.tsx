'use client'

import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface Brand {
  id: string
  name: string
  logo: string
}

interface BrandSelectorProps {
  selectedBrand: string | null
  onSelectBrand: (brandId: string | null) => void
}

export default function BrandSelector({ selectedBrand, onSelectBrand }: BrandSelectorProps) {
  const [scrollPosition, setScrollPosition] = useState(0)
  const scrollAmount = 200

  const useBrands = () => {
    const [brands, setBrands] = useState<Brand[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      const fetchBrands = async () => {
        try {
          const res = await fetch('http://localhost:3000/api/marks')
          const data = await res.json()
          setBrands(data.marks)
        } catch (err) {
          console.error('Failed to load brands', err)
        } finally {
          setLoading(false)
        }
      }

      fetchBrands()
    }, [])

    return { brands, loading }
  }

  const { brands, loading } = useBrands()
  if (loading) return <div>Загрузка брендов...</div>

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
              <span className="text-sm font-medium mt-auto">{brand.name}</span>
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

