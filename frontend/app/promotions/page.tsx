import { Metadata } from 'next'
import PromotionList from '@/components/promotion-list'
import PromotionsHero from '@/components/promotions-hero'
import PromotionSubscribe from '@/components/promotion-subscribe'

export const metadata: Metadata = {
  title: 'Акции и спецпредложения | ДЦ Орехово',
  description: 'Эксклюзивные акции и специальные предложения на автомобили в ДЦ Орехово. Не упустите свой шанс на выгодную покупку!',
}

export default function PromotionsPage() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      <PromotionsHero />
      <div className="container mx-auto px-4 py-12">
        <PromotionList />
        <PromotionSubscribe />
      </div>
    </div>
  )
}

