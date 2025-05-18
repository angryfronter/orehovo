"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Trash2, Plus } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { fetchBanks, createBank, updateBank, deleteBank } from "@/src/utils/api"

interface Bank {
  id: string
  name: string
  description: string
}

export default function BanksManagement() {
  const [banks, setBanks] = useState<Bank[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [currentBank, setCurrentBank] = useState<Bank | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    async function loadBanks() {
      try {
        const data = await fetchBanks()

        const mappedBanks = data.banks.map((bank: any) => ({
          id: bank.id,
          name: bank.name,
          description: bank.description
        }))

        setBanks(mappedBanks)
      } catch (err: any) {
        console.error(err)
        setError(err.message || "Ошибка загрузки данных")
      } finally {
        setIsLoading(false)
      }
    }
  
    loadBanks()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    if (currentBank) {
      if (name === "date") {
        setCurrentBank({ ...currentBank, date: new Date(value) })
      } else {
        setCurrentBank({ ...currentBank, [name]: value })
      }
    }
  }

  const handleAddBank = async () => {
    if (!currentBank) return

    try {
      if (isEditing && currentBank.id) {
        const updated = await updateBank(currentBank.id, { bank: currentBank })
        setBanks(banks.map(e => e.id === updated.id ? updated : e))
      } else {
        const created = await createBank({ bank: currentBank })
        setBanks([...banks, created])
      }

      setIsDialogOpen(false)
      setCurrentBank(null)
      setIsEditing(false)
    } catch (err: any) {
      console.error(err)
      setError("Ошибка при сохранении банка")
    }
  }

  const handleEditBank = (bank: Bank) => {
    setCurrentBank(bank)
    setIsEditing(true)
    setIsDialogOpen(true)
  }

  const handleDeleteBank = async (id: string) => {
    try {
      await deleteBank(id)
      setBanks(banks.filter(bank => bank.id !== id))
    } catch (err: any) {
      console.error(err)
      setError("Ошибка при удалении банка")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Управление банками</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setCurrentBank({
                  id: '',
                  name: "",
                  description: ""
                })
                setIsEditing(false)
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Добавить банк
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{isEditing ? "Редактировать банк" : "Добавить новый банк"}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Название
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={currentBank?.name || ""}
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
                  value={currentBank?.description || ""}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
            </div>
            <Button onClick={handleAddBank}>{isEditing ? "Сохранить изменения" : "Добавить банк"}</Button>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Название</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {banks.map((bank) => (
            <TableRow key={bank.id}>
              <TableCell>{bank.name}</TableCell>
              <TableCell>
                <Button variant="ghost" size="icon" onClick={() => handleEditBank(bank)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDeleteBank(bank.id)}>
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

