import { Metadata } from 'next'
import TradeInHero from '@/components/trade-in-hero'
import TradeInBenefits from '@/components/trade-in-benefits'
import TradeInProcess from '@/components/trade-in-process'
import TradeInForm from '@/components/trade-in-form'
import BankPartners from '@/components/bank-partners'
import CallToAction from '@/components/call-to-action'

export const metadata: Metadata = {
  title: 'Trade-in | ДЦ Орехово',
  description: 'Обменяйте ваш автомобиль на новый с выгодой до 100 000 рублей в ДЦ Орехово',
}

export default function TradeInPage() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      <TradeInHero />
      <TradeInBenefits />
      <TradeInProcess />
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <TradeInForm />
          <BankPartners />
        </div>
      </div>
      <CallToAction />
    </div>
  )
}

