import { render, screen } from "@testing-library/react"
import { PromotionList } from "../PromotionList"
import type { Promotion } from "@/types"

const mockPromotions: Promotion[] = [
  {
    id: "1",
    title: "Летняя распродажа",
    description: "Скидки до 15% на все модели",
    startDate: "2023-06-01",
    endDate: "2023-08-31",
    image: "/images/summer-sale.jpg",
  },
  {
    id: "2",
    title: "Кредит 0%",
    description: "Первый взнос от 10%, срок до 3 лет",
    startDate: "2023-07-01",
    endDate: "2023-09-30",
    image: "/images/zero-percent-credit.jpg",
  },
]

describe("PromotionList", () => {
  it("renders all promotions", () => {
    render(<PromotionList promotions={mockPromotions} />)

    const promotionElements = screen.getAllByRole("heading", { level: 2 })
    expect(promotionElements).toHaveLength(2)

    expect(screen.getByText("Летняя распродажа")).toBeInTheDocument()
    expect(screen.getByText("Кредит 0%")).toBeInTheDocument()
  })

  it("displays correct promotion information", () => {
    render(<PromotionList promotions={mockPromotions} />)

    const summerSalePromotion = screen.getByText("Летняя распродажа")
    const summerSaleDescription = screen.getByText("Скидки до 15% на все модели")
    const summerSaleDates = screen.getByText("01.06.2023 - 31.08.2023")

    expect(summerSalePromotion).toBeInTheDocument()
    expect(summerSaleDescription).toBeInTheDocument()
    expect(summerSaleDates).toBeInTheDocument()
  })
})

