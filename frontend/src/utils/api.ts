import type { Car, Promotion, CreditProgram } from "@/types"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.example.com"

export async function fetchPromotions(): Promise<Promotion[]> {
  const response = await fetch(`${API_URL}/promotions`)
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

export async function fetchCars(): Promise<Car[]> {
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