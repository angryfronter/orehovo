"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Trash2, Plus } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { fetchCreditPrograms, createCreditProgram, updateCreditProgram, deleteCreditProgram } from "@/src/utils/api"

interface CreditProgram {
  id: number
  name: string
  description: string
  interest_rate: number
  term: number
  down_payment: number
}

export default function CreditProgramsManagement() {
  const [creditPrograms, setCreditPrograms] = useState<CreditProgram[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [currentProgram, setCurrentProgram] = useState<CreditProgram | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    async function loadCreditPrograms() {
      try {
        const data = await fetchCreditPrograms()

        // Преобразуем ответ API в формат нужный фронту
        const mappedCreditPrograms = data.credit_programs.map((program: any) => ({
          id: program.id,
          name: program.name,
          description: program.description,
          interest_rate: program.interest_rate,
          term: program.term,
          down_payment: program.down_payment,
        }))

        setCreditPrograms(mappedCreditPrograms)
      } catch (err: any) {
        console.error(err)
        setError(err.message || "Ошибка загрузки данных")
      } finally {
        setIsLoading(false)
      }
    }
  
    loadCreditPrograms()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (currentProgram) {
      setCurrentProgram({
        ...currentProgram,
        [name]: name === "interest_rate" || name === "term" || name === "down_payment" ? Number(value) : value,
      })
    }
  }

  const handleAddProgram = async () => {
    if (!currentProgram) return
  
    try {
      if (isEditing && currentProgram.id) {
        const updated = await updateCreditProgram(currentProgram.id, currentProgram)
        setCreditPrograms(creditPrograms.map(p => p.id === updated.id ? updated : p))
      } else {
        const created = await createCreditProgram(currentProgram)
        setCreditPrograms([...creditPrograms, created])
      }
  
      setIsDialogOpen(false)
      setCurrentProgram(null)
      setIsEditing(false)
    } catch (err: any) {
      console.error(err)
      setError("Ошибка при сохранении акции")
    }
  }

  const handleEditProgram = (program: CreditProgram) => {
    setCurrentProgram(program)
    setIsEditing(true)
    setIsDialogOpen(true)
  }

  const handleDeleteProgram = async (id: number) => {
    try {
      await deleteCreditProgram(id)
      setCreditPrograms(creditPrograms.filter(program => program.id !== id))
    } catch (err: any) {
      console.error(err)
      setError("Ошибка при удалении программы")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Управление кредитными программами</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setCurrentProgram({
                  id: 0,
                  name: "",
                  description: "",
                  interest_rate: 0,
                  term: 0,
                  down_payment: 0,
                })
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
                <Label htmlFor="interest_rate" className="text-right">
                  Процентная ставка
                </Label>
                <Input
                  id="interest_rate"
                  name="interest_rate"
                  type="number"
                  step="0.1"
                  value={currentProgram?.interest_rate || ""}
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
                <Label htmlFor="down_payment" className="text-right">
                  Первоначальный взнос (%)
                </Label>
                <Input
                  id="down_payment"
                  name="down_payment"
                  type="number"
                  value={currentProgram?.down_payment || ""}
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
              <TableCell>{program.interest_rate}%</TableCell>
              <TableCell>{program.term}</TableCell>
              <TableCell>{program.down_payment}%</TableCell>
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

