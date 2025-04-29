export interface Car {
  id: string
  brand: string
  model: string
  year: number
  price: number
  image: string
  engine: string
  transmission: string
  drivetrain: string
  fuelType: string
  bodyType: string
  color: string
}

export interface Promotion {
  id: string
  title: string
  description: string
  startDate: string
  endDate: string
  image: string
}

export interface CreditProgram {
  id: string
  name: string
  description: string
  interestRate: number
  term: number
  downPayment: number
}

export interface Sobitie {
  id: number
  name: string
  description: string
  date: string
  location: string
  event_type: "test-drive" | "presentation" | "sale"
}
