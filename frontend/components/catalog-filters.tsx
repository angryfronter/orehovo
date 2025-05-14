"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { fetchBodyTypes, fetchGearboxes, fetchDriveTypes } from "@/src/utils/api"

interface CatalogFiltersProps {
  onChange: (name: string, value: string) => void
}

export default function CatalogFilters({ onChange }: CatalogFiltersProps) {
  const [bodyType, setBodyType] = useState("all")
  const [gearbox, setGearbox] = useState("all")
  const [drive, setDrive] = useState("all")
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const [bodyTypes, setBodyTypes] = useState<any[]>([])
  const [gearboxes, setGearboxes] = useState<any[]>([])
  const [driveTypes, setDriveTypes] = useState<any[]>([])

  useEffect(() => {
    fetchBodyTypes().then((res) => setBodyTypes(res.body_types))
    fetchGearboxes().then((res) => setGearboxes(res.gearboxes))
    fetchDriveTypes().then((res) => setDriveTypes(res.drive_types))
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onChange("bodyType", bodyType)
    onChange("gearbox", gearbox)
    onChange("drive", drive)
    onChange("minPrice", minPrice)
    onChange("maxPrice", maxPrice)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-4">
      <div className="flex-1 min-w-[200px]">
        <label className="block text-sm font-medium text-gray-700 mb-1">Тип кузова</label>
        <Select onValueChange={setBodyType} value={bodyType}>
          <SelectTrigger id="bodyType">
            <SelectValue placeholder="Тип кузова" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все</SelectItem>
            {bodyTypes.map((type) => (
              <SelectItem key={type.id} value={type.name}>{type.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex-1 min-w-[200px]">
        <label className="block text-sm font-medium text-gray-700 mb-1">Коробка передач</label>
        <Select onValueChange={setGearbox} value={gearbox}>
          <SelectTrigger id="gearbox">
            <SelectValue placeholder="Тип КПП" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все</SelectItem>
            {gearboxes.map((type) => (
              <SelectItem key={type.id} value={type.name}>{type.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex-1 min-w-[200px]">
        <label className="block text-sm font-medium text-gray-700 mb-1">Привод</label>
        <Select onValueChange={setDrive} value={drive}>
          <SelectTrigger id="drive">
            <SelectValue placeholder="Привод" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все</SelectItem>
            {driveTypes.map((type) => (
              <SelectItem key={type.id} value={type.name}>{type.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex-1 min-w-[200px]">
        <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700 mb-1">
          Цена от
        </label>
        <Input
          id="minPrice"
          type="number"
          placeholder="Цена от"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
      </div>
      <div className="flex-1 min-w-[200px]">
        <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-1">
          Цена до
        </label>
        <Input
          id="maxPrice"
          type="number"
          placeholder="Цена до"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>
      <Button type="submit" className="flex-1 min-w-[200px]">
        Применить фильтры
      </Button>
    </form>
  )
}

