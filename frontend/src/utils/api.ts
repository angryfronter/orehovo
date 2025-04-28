import type { Car, Promotion, CreditProgram } from "@/types"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.example.com"

export async function fetchPromotions(): Promise<{ promotions: any[] }> {
  const response = await fetch(`${API_URL}/api/promotions`)
  if (!response.ok) {
    throw new Error("Failed to fetch promotions")
  }
  return response.json()
}

export async function fetchCreditPrograms(): Promise<CreditProgram[]> {
  const response = await fetch(`${API_URL}/credit-programs`)
  if (!response.ok) {
    throw new Error("Failed to fetch credit programs")
  }
  return response.json()
}

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
