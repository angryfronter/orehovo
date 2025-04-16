import type { Metadata } from "next"
import CreditHero from "@/components/credit-hero"
import CreditCalculatorForm from "@/components/credit-calculator-form"
import BankPartners from "@/components/bank-partners"
import CreditBenefits from "@/components/credit-benefits"
import SpecialCreditOffers from "@/components/special-credit-offers"

export const metadata: Metadata = {
  title: "Автокредит онлайн | Быстрое одобрение",
  description:
    "Получите автокредит онлайн за 15 минут. Выгодные ставки от ведущих банков. Быстрое одобрение и удобные условия.",
}

export default function CreditPage() {
  return (
    <div className="bg-white">
      <CreditHero />
      <div className="container mx-auto px-4 py-12">
        <div className="mb-16">
          <CreditCalculatorForm />
        </div>
        <CreditBenefits />
        <SpecialCreditOffers />
        <BankPartners />
      </div>
    </div>
  )
}

