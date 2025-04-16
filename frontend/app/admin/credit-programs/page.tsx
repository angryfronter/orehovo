"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Trash2, Plus } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface CreditProgram {
  id: string
  name: string
  description: string
  interestRate: number
  term: number
  downPayment: number
}

const initialCreditPrograms: CreditProgram[] = [
  {
    id: "1",
    name: "Стандартный кредит",
    description: "Базовая программа кредитования",
    interestRate: 9.9,
    term: 60,
    downPayment: 20,
  },
  {
    id: "2",
    name: "Первый автомобиль",
    description: "Специальная программа для покупки первого автомобиля",
    interestRate: 8.5,
    term: 84,
    downPayment: 10,
  },
]

export default function CreditProgramsManagement() {
  const [creditPrograms, setCreditPrograms] = useState<CreditProgram[]>(initialCreditPrograms)
  const [currentProgram, setCurrentProgram] = useState<CreditProgram | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (currentProgram) {
      setCurrentProgram({
        ...currentProgram,
        [name]: name === "interestRate" || name === "term" || name === "downPayment" ? Number(value) : value,
      })
    }
  }

  const handleAddProgram = () => {
    if (currentProgram) {
      if (isEditing) {
        setCreditPrograms(
          creditPrograms.map((program) => (program.id === currentProgram.id ? currentProgram : program)),
        )
      } else {
        setCreditPrograms([...creditPrograms, { ...currentProgram, id: Date.now().toString() }])
      }
      setIsDialogOpen(false)
      setCurrentProgram(null)
      setIsEditing(false)
    }
  }

  const handleEditProgram = (program: CreditProgram) => {
    setCurrentProgram(program)
    setIsEditing(true)
    setIsDialogOpen(true)
  }

  const handleDeleteProgram = (id: string) => {
    setCreditPrograms(creditPrograms.filter((program) => program.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Управление кредитными программами</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setCurrentProgram(null)
                setIsEditing(false)
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Добавить программу
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{isEditing ? "Редактировать программу" : "Добавить новую программу"}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Название
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={currentProgram?.name || ""}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Описание
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={currentProgram?.description || ""}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="interestRate" className="text-right">
                  Процентная ставка
                </Label>
                <Input
                  id="interestRate"
                  name="interestRate"
                  type="number"
                  step="0.1"
                  value={currentProgram?.interestRate || ""}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="term" className="text-right">
                  Срок (месяцев)
                </Label>
                <Input
                  id="term"
                  name="term"
                  type="number"
                  value={currentProgram?.term || ""}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="downPayment" className="text-right">
                  Первоначальный взнос (%)
                </Label>
                <Input
                  id="downPayment"
                  name="downPayment"
                  type="number"
                  value={currentProgram?.downPayment || ""}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
            </div>
            <Button onClick={handleAddProgram}>{isEditing ? "Сохранить изменения" : "Добавить программу"}</Button>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Название</TableHead>
            <TableHead>Описание</TableHead>
            <TableHead>Процентная ставка</TableHead>
            <TableHead>Срок (месяцев)</TableHead>
            <TableHead>Первоначальный взнос (%)</TableHead>
            <TableHead>Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {creditPrograms.map((program) => (
            <TableRow key={program.id}>
              <TableCell>{program.name}</TableCell>
              <TableCell>{program.description}</TableCell>
              <TableCell>{program.interestRate}%</TableCell>
              <TableCell>{program.term}</TableCell>
              <TableCell>{program.downPayment}%</TableCell>
              <TableCell>
                <Button variant="ghost" size="icon" onClick={() => handleEditProgram(program)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDeleteProgram(program.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

