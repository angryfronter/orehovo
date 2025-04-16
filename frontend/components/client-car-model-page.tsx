'use client'

import { useState } from 'react'
import CarModelPage from '@/components/car-model-page'

export default function ClientCarModelPage(props: React.ComponentProps<typeof CarModelPage>) {
  const [openForm, setOpenForm] = useState<'test-drive' | 'purchase' | null>(null)

  return (
    <CarModelPage
      {...props}
      openForm={openForm}
      setOpenForm={setOpenForm}
    />
  )
}

