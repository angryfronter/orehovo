"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Phone, MapPin } from "lucide-react"
import { fetchContact } from "@/src/utils/api"

interface ContactInfoFormProps {
  isOpen: boolean
  onClose: () => void
}

export function ContactInfoForm({ isOpen, onClose }: ContactInfoFormProps) {
  const [contact, setContact] = useState<any | null>(null)

  useEffect(() => {
    if (isOpen) {
      fetchContact()
        .then((data) => setContact(data.contact))
        .catch((err) => console.error("Ошибка загрузки контактов:", err))
    }
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Контактная информация</DialogTitle>
        </DialogHeader>
        <div className="mt-6 space-y-4">
          {contact ? (
            <>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary" />
                <span className="text-lg">{contact.phone}</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary mt-1" />
                <span className="text-lg">{contact.address}</span>
              </div>
            </>
          ) : (
            <p className="text-muted-foreground text-sm">Загрузка...</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
