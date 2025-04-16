import type { Car } from "@/types"

export const sortCarsByPrice = (cars: Car[]): Car[] => {
  return [...cars].sort((a, b) => a.price - b.price)
}

