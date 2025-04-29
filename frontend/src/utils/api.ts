import type { Car, Promotion, CreditProgram } from "@/types"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.example.com"

export async function fetchPromotions(): Promise<{ promotions: any[] }> {
  const response = await fetch(`${API_URL}/api/promotions`)
  if (!response.ok) {
    throw new Error("Failed to fetch promotions")
  }
  return response.json()
}

export async function createPromotion(promotion: Omit<Promotion, "id">): Promise<Promotion> {
  const response = await fetch(`${API_URL}/api/promotions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ promotion }),
  })

  if (!response.ok) throw new Error("Failed to create promotion")

  const data = await response.json()
  return data.promotion
}

export async function updatePromotion(id: number, promotion: Promotion): Promise<Promotion> {
  const response = await fetch(`${API_URL}/api/promotions/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ promotion }),
  })

  if (!response.ok) throw new Error("Failed to update promotion")

  const data = await response.json()
  return data.promotion
}

export async function deletePromotion(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/api/promotions/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) throw new Error("Failed to delete promotion")
}

///////////////////////////////////////////////////////////////////

export async function fetchCreditPrograms(): Promise<{ credit_programs: any[] }> {
  const response = await fetch(`${API_URL}/api/credit_programs`)
  if (!response.ok) {
    throw new Error("Failed to fetch credit programs")
  }
  return response.json()
}

export async function createCreditProgram(credit_program: Omit<CreditProgram, "id">): Promise<CreditProgram> {
  const response = await fetch(`${API_URL}/api/credit_programs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ credit_program }),
  })

  if (!response.ok) throw new Error("Failed to create credit program")

  const data = await response.json()
  return data.credit_program
}

export async function updateCreditProgram(id: number, credit_program: CreditProgram): Promise<CreditProgram> {
  const response = await fetch(`${API_URL}/api/credit_programs/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ credit_program }),
  })

  if (!response.ok) throw new Error("Failed to update credit program")

  const data = await response.json()
  return data.credit_program
}

export async function deleteCreditProgram(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/api/credit_programs/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) throw new Error("Failed to delete credit program")
}

///////////////////////////////////////////////////////////////////

export async function fetchCars(): Promise<{ cars: any[] }> {
  const response = await fetch(`${API_URL}/api/cars`)
  if (!response.ok) {
    throw new Error("Failed to fetch cars")
  }
  return response.json()
}

export async function fetchCarById(id: string): Promise<Car> {
  const response = await fetch(`${API_URL}/api/cars/${id}`)
  if (!response.ok) {
    throw new Error("Failed to fetch car")
  }
  return response.json()
}

export async function deleteCar(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/api/cars/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error("Failed to delete car")
  }
}

export async function updateCar(id: number, car: Car): Promise<Car> {
  const response = await fetch(`${API_URL}/api/cars/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(car),
  })
  
  if (!response.ok) {
    throw new Error("Failed to update car")
  }

  return response.json()
}
