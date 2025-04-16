import { render, screen } from "@testing-library/react"
import { CarList } from "@/components/CarList"

const mockCars = [
  { id: 1, brand: "Toyota", model: "Camry", price: 30000 },
  { id: 2, brand: "Honda", model: "Civic", price: 25000 },
]

describe("CarList", () => {
  it("renders cars in sorted order", () => {
    render(<CarList cars={mockCars} />)

    const carItems = screen.getAllByRole("listitem")
    expect(carItems).toHaveLength(2)
    expect(carItems[0]).toHaveTextContent("Honda Civic - 25000")
    expect(carItems[1]).toHaveTextContent("Toyota Camry - 30000")
  })
})

