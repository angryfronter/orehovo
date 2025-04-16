"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Check, X } from "lucide-react"

interface Inquiry {
  id: number
  name: string
  email: string
  phone: string
  type: "test-drive" | "purchase" | "info"
  carModel: string
  date: string
  status: "new" | "in-progress" | "completed"
}

const initialInquiries: Inquiry[] = [
  {
    id: 1,
    name: "Иван Иванов",
    email: "ivan@example.com",
    phone: "+7 (999) 123-45-67",
    type: "test-drive",
    carModel: "BAIC U5 PLUS",
    date: "2023-07-15",
    status: "new",
  },
  {
    id: 2,
    name: "Мария Петрова",
    email: "maria@example.com",
    phone: "+7 (999) 987-65-43",
    type: "purchase",
    carModel: "CHERY Tiggo 7 Pro",
    date: "2023-07-14",
    status: "in-progress",
  },
  {
    id: 3,
    name: "Алексей Сидоров",
    email: "alexey@example.com",
    phone: "+7 (999) 456-78-90",
    type: "info",
    carModel: "EXEED TXL",
    date: "2023-07-13",
    status: "completed",
  },
]

export default function InquiriesManagement() {
  const [inquiries, setInquiries] = useState<Inquiry[]>(initialInquiries)

  const handleStatusChange = (id: number, newStatus: "new" | "in-progress" | "completed") => {
    setInquiries((prev) => prev.map((inquiry) => (inquiry.id === id ? { ...inquiry, status: newStatus } : inquiry)))
  }

  const getStatusBadge = (status: Inquiry["status"]) => {
    switch (status) {
      case "new":
        return <Badge variant="default">Новый</Badge>
      case "in-progress":
        return <Badge variant="secondary">В работе</Badge>
      case "completed":
        return <Badge variant="success">Завершен</Badge>
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Управление запросами</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Имя</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Телефон</TableHead>
            <TableHead>Тип запроса</TableHead>
            <TableHead>Модель авто</TableHead>
            <TableHead>Дата</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead>Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inquiries.map((inquiry) => (
            <TableRow key={inquiry.id}>
              <TableCell>{inquiry.name}</TableCell>
              <TableCell>{inquiry.email}</TableCell>
              <TableCell>{inquiry.phone}</TableCell>
              <TableCell>
                {inquiry.type === "test-drive" && "Тест-драйв"}
                {inquiry.type === "purchase" && "Покупка"}
                {inquiry.type === "info" && "Информация"}
              </TableCell>
              <TableCell>{inquiry.carModel}</TableCell>
              <TableCell>{inquiry.date}</TableCell>
              <TableCell>{getStatusBadge(inquiry.status)}</TableCell>
              <TableCell>
                <Button variant="ghost" size="icon" onClick={() => handleStatusChange(inquiry.id, "in-progress")}>
                  <Check className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleStatusChange(inquiry.id, "completed")}>
                  <X className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

