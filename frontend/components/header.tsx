"use client"

import Link from "next/link"
import { Phone, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect, useCallback, useMemo } from "react"
import { RequestForm } from "@/components/request-form"
import { ContactInfoForm } from "@/components/contact-info-form"
import { cn } from "@/lib/utils"

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openForm, setOpenForm] = useState<"callback" | "contact-info" | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleCallbackRequest = useCallback(() => {
    setOpenForm("callback")
  }, [])

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false)
  }, [])

  const headerClasses = useMemo(
    () =>
      cn(
        "fixed top-0 left-0 right-0 bg-white z-50 transition-all duration-200",
        isScrolled ? "shadow-md" : "shadow-sm",
      ),
    [isScrolled],
  )

  const navItems = useMemo(
    () => [
      { href: "/", text: "Главная" },
      { href: "/catalog", text: "Каталог" },
      { href: "/credit", text: "Автокредит" },
      { href: "/trade-in", text: "Trade-in" },
      { href: "/promotions", text: "Акции" },
      { href: "/contacts", text: "Контакты" },
    ],
    [],
  )

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold shrink-0">
            ДЦ Орехово
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {item.text}
              </Link>
            ))}
          </nav>

          {/* Contact and CTA Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setOpenForm("contact-info")}
              className="text-primary p-1"
              aria-label="Показать контактную информацию"
            >
              <Phone className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleCallbackRequest} className="whitespace-nowrap text-xs">
              Обратный звонок
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1"
            aria-label={mobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden fixed inset-x-0 top-14 bg-white shadow-lg z-50 max-h-[calc(100vh-3.5rem)] overflow-y-auto">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="py-2 hover:text-primary" onClick={closeMobileMenu}>
                {item.text}
              </Link>
            ))}
            <div className="pt-4 border-t">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpenForm("contact-info")}
                className="text-primary"
                aria-label="Показать контактную информацию"
              >
                <Phone className="w-5 h-5" />
              </Button>
              <Button variant="outline" className="w-full mb-2" onClick={handleCallbackRequest}>
                Обратный звонок
              </Button>
            </div>
          </div>
        </nav>
      )}

      {openForm === "contact-info" ? (
        <ContactInfoForm isOpen={openForm === "contact-info"} onClose={() => setOpenForm(null)} />
      ) : (
        <RequestForm isOpen={openForm !== null} onClose={() => setOpenForm(null)} formType={openForm || "callback"} />
      )}
    </header>
  )
}

export default Header

