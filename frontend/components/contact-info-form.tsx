import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Phone, MapPin } from "lucide-react"

interface ContactInfoFormProps {
  isOpen: boolean
  onClose: () => void
}

export function ContactInfoForm({ isOpen, onClose }: ContactInfoFormProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Контактная информация</DialogTitle>
        </DialogHeader>
        <div className="mt-6 space-y-4">
          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-primary" />
            <span className="text-lg">+7 (495) 495-95-95</span>
          </div>
          <div className="flex items-start space-x-3">
            <MapPin className="w-5 h-5 text-primary mt-1" />
            <span className="text-lg">г. Москва, Ореховый бульвар, 26</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

