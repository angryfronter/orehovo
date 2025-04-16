import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function CallToAction() {
  return (
    <section className="bg-primary text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Готовы к покупке автомобиля мечты?</h2>
        <p className="text-xl mb-8">Не упустите шанс получить эксклюзивные предложения и персональную скидку!</p>
        <div className="flex justify-center space-x-4">
          <Link href="/catalog">
            <Button variant="secondary" size="lg" asChild>
              <span>Выбрать автомобиль</span>
            </Button>
          </Link>
          <Link href="/credit">
            <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-gray-100" asChild>
              <span>Рассчитать кредит</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

