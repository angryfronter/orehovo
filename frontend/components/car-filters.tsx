'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'

export default function CarFilters() {
  const [brand, setBrand] = useState('')
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(10000000)
  const router = useRouter()

  const handleFilter = () => {
    const params = new URLSearchParams(window.location.search)
    if (brand) params.set('brand', brand)
    else params.delete('brand')
    params.set('minPrice', minPrice.toString())
    params.set('maxPrice', maxPrice.toString())
    router.push(`/catalog?${params.toString()}`)
  }

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="brand">Марка</Label>
        <Select onValueChange={setBrand}>
          <SelectTrigger id="brand">
            <SelectValue placeholder="Выберите марку" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ARCFOX">ARCFOX</SelectItem>
            <SelectItem value="BAIC">BAIC</SelectItem>
            {/* Add more brands here */}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Цена</Label>
        <Slider
          min={0}
          max={10000000}
          step={100000}
          value={[minPrice, maxPrice]}
          onValueChange={([min, max]) => {
            setMinPrice(min)
            setMaxPrice(max)
          }}
        />
        <div className="flex justify-between mt-2">
          <span>{minPrice.toLocaleString()} ₽</span>
          <span>{maxPrice.toLocaleString()} ₽</span>
        </div>
      </div>
      <Button onClick={handleFilter} className="w-full">Применить фильтры</Button>
    </div>
  )
}

