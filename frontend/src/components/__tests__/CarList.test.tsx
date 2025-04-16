import { render, screen } from "@testing-library/react"
import { CarList } from "../CarList"
import type { Car } from "@/types"

const mockCars: Car[] = [
  {
    id: "1",
    brand: "Toyota",
    model: "Camry",
    year: 2023,
    price: 2500000,
    image: "/images/toyota-camry.jpg",
    engine: "2.5L",
    transmission: "Automatic",
    drivetrain: "FWD",
    fuelType: "Gasoline",
    bodyType: "Sedan",
    color: "White",
  },
  {
    id: "2",
    brand: "Honda",
    model: "Civic",
    year: 2023,
    price: 2000000,
    image: "/images/honda-civic.jpg",
    engine: "1.5L Turbo",
    transmission: "CVT",
    drivetrain: "FWD",
    fuelType: "Gasoline",
    bodyType: "Sedan",
    color: "Red",
  },
]

describe("CarList", () => {
  it("renders cars in sorted order by price", () => {
    render(<CarList cars={mockCars} />)

    const carElements = screen.getAllByRole("link")
    expect(carElements).toHaveLength(2)

    const firstCarTitle = carElements[0].querySelector("h2")
    const secondCarTitle = carElements[1].querySelector("h2")

    expect(firstCarTitle).toHaveTextContent("Honda Civic")
    expect(secondCarTitle).toHaveTextContent("Toyota Camry")
  })

  it("displays correct car information", () => {
    render(<CarList cars={mockCars} />)

    const hondaCivic = screen.getByText("Honda Civic")
    const hondaCivicYear = screen.getByText("Год: 2023")
    const hondaCivicPrice = screen.getByText("от 2 000 000 ₽")

    expect(hondaCivic).toBeInTheDocument()
    expect(hondaCivicYear).toBeInTheDocument()
    expect(hondaCivicPrice).toBeInTheDocument()
  })
})

