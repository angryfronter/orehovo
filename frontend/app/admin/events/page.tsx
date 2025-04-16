"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Trash2, Plus } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface Event {
  id: string
  title: string
  description: string
  date: Date
  location: string
  type: "test-drive" | "presentation" | "sale"
}

const initialEvents: Event[] = [
  {
    id: "1",
    title: "Тест-драйв нового BAIC X35",
    description: "Приглашаем вас на тест-драйв нового кроссовера BAIC X35",
    date: new Date("2023-07-15"),
    location: "ДЦ Орехово, Ореховый бульвар, 26",
    type: "test-drive",
  },
  {
    id: "2",
    title: "Презентация EXEED TXL",
    description: "Торжественная презентация нового EXEED TXL",
    date: new Date("2023-07-20"),
    location: "ДЦ Орехово, Ореховый бульвар, 26",
    type: "presentation",
  },
]

export default function EventsManagement() {
  const [events, setEvents] = useState<Event[]>(initialEvents)
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    if (currentEvent) {
      if (name === "date") {
        setCurrentEvent({ ...currentEvent, date: new Date(value) })
      } else {
        setCurrentEvent({ ...currentEvent, [name]: value })
      }
    }
  }

  const handleAddEvent = () => {
    if (currentEvent) {
      if (isEditing) {
        setEvents(events.map((event) => (event.id === currentEvent.id ? currentEvent : event)))
      } else {
        setEvents([...events, { ...currentEvent, id: Date.now().toString() }])
      }
      setIsDialogOpen(false)
      setCurrentEvent(null)
      setIsEditing(false)
    }
  }

  const handleEditEvent = (event: Event) => {
    setCurrentEvent(event)
    setIsEditing(true)
    setIsDialogOpen(true)
  }

  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter((event) => event.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Управление событиями</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setCurrentEvent(null)
                setIsEditing(false)
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Добавить событие
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{isEditing ? "Редактировать событие" : "Добавить новое событие"}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Название
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={currentEvent?.title || ""}
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
                  value={currentEvent?.description || ""}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Дата
                </Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={currentEvent?.date ? new Date(currentEvent.date).toISOString().split("T")[0] : ""}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right">
                  Место
                </Label>
                <Input
                  id="location"
                  name="location"
                  value={currentEvent?.location || ""}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Тип
                </Label>
                <select
                  id="type"
                  name="type"
                  value={currentEvent?.type || ""}
                  onChange={handleInputChange}
                  className="col-span-3"
                >
                  <option value="test-drive">Тест-драйв</option>
                  <option value="presentation">Презентация</option>
                  <option value="sale">Распродажа</option>
                </select>
              </div>
            </div>
            <Button onClick={handleAddEvent}>{isEditing ? "Сохранить изменения" : "Добавить событие"}</Button>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Название</TableHead>
            <TableHead>Дата</TableHead>
            <TableHead>Место</TableHead>
            <TableHead>Тип</TableHead>
            <TableHead>Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event.id}>
              <TableCell>{event.title}</TableCell>
              <TableCell>{event.date.toLocaleDateString()}</TableCell>
              <TableCell>{event.location}</TableCell>
              <TableCell>{event.type}</TableCell>
              <TableCell>
                <Button variant="ghost" size="icon" onClick={() => handleEditEvent(event)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDeleteEvent(event.id)}>
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

