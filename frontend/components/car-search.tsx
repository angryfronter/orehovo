'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function CarSearch() {
  const [search, setSearch] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(window.location.search)
    if (search) {
      params.set('search', search)
    } else {
      params.delete('search')
    }
    router.push(`/catalog?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSearch} className="flex space-x-2 mb-4">
      <Input
        type="text"
        placeholder="Поиск по марке или модели"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button type="submit">Поиск</Button>
    </form>
  )
}

