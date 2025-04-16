import { Button } from '@/components/ui/button'

export default function Pagination() {
  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      <Button variant="outline" disabled>Предыдущая</Button>
      <Button variant="outline">1</Button>
      <Button variant="outline">2</Button>
      <Button variant="outline">3</Button>
      <Button variant="outline">Следующая</Button>
    </div>
  )
}

