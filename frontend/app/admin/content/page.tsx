"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Trash2, Plus, FileText, ImageIcon } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Page {
  id: string
  title: string
  slug: string
  content: string
  metaTitle: string
  metaDescription: string
}

interface StaticContent {
  id: string
  key: string
  value: string
}

const initialPages: Page[] = [
  {
    id: "1",
    title: "Главная страница",
    slug: "/",
    content: "Содержание главной страницы...",
    metaTitle: "ДЦ Орехово - Главная",
    metaDescription: "Официальный дилер. Продажа и обслуживание автомобилей в Москве.",
  },
  {
    id: "2",
    title: "О нас",
    slug: "/about",
    content: "Информация о компании...",
    metaTitle: "О компании ДЦ Орехово",
    metaDescription: "Узнайте больше о нашей компании и наших услугах.",
  },
]

const initialStaticContent: StaticContent[] = [
  { id: "1", key: "header_phone", value: "+7 (495) 495-95-95" },
  { id: "2", key: "footer_address", value: "г. Москва, Ореховый бульвар, 26" },
  { id: "3", key: "company_name", value: "ДЦ Орехово" },
]

export default function ContentManagement() {
  const [pages, setPages] = useState<Page[]>(initialPages)
  const [staticContent, setStaticContent] = useState<StaticContent[]>(initialStaticContent)
  const [currentPage, setCurrentPage] = useState<Page | null>(null)
  const [currentStaticContent, setCurrentStaticContent] = useState<StaticContent | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("pages")

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (currentPage) {
      setCurrentPage({ ...currentPage, [name]: value })
    }
  }

  const handleStaticContentInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (currentStaticContent) {
      setCurrentStaticContent({ ...currentStaticContent, [name]: value })
    }
  }

  const handleAddPage = () => {
    if (currentPage) {
      if (isEditing) {
        setPages(pages.map((page) => (page.id === currentPage.id ? currentPage : page)))
      } else {
        setPages([...pages, { ...currentPage, id: Date.now().toString() }])
      }
      setIsDialogOpen(false)
      setCurrentPage(null)
      setIsEditing(false)
    }
  }

  const handleAddStaticContent = () => {
    if (currentStaticContent) {
      if (isEditing) {
        setStaticContent(
          staticContent.map((item) => (item.id === currentStaticContent.id ? currentStaticContent : item)),
        )
      } else {
        setStaticContent([...staticContent, { ...currentStaticContent, id: Date.now().toString() }])
      }
      setIsDialogOpen(false)
      setCurrentStaticContent(null)
      setIsEditing(false)
    }
  }

  const handleEditPage = (page: Page) => {
    setCurrentPage(page)
    setIsEditing(true)
    setIsDialogOpen(true)
  }

  const handleEditStaticContent = (content: StaticContent) => {
    setCurrentStaticContent(content)
    setIsEditing(true)
    setIsDialogOpen(true)
  }

  const handleDeletePage = (id: string) => {
    setPages(pages.filter((page) => page.id !== id))
  }

  const handleDeleteStaticContent = (id: string) => {
    setStaticContent(staticContent.filter((item) => item.id !== id))
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Управление контентом</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="pages">Страницы</TabsTrigger>
          <TabsTrigger value="static">Статический контент</TabsTrigger>
        </TabsList>

        <TabsContent value="pages" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Страницы</h2>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  onClick={() => {
                    setCurrentPage(null)
                    setIsEditing(false)
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Добавить страницу
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                  <DialogTitle>{isEditing ? "Редактировать страницу" : "Добавить новую страницу"}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                      Заголовок
                    </Label>
                    <Input
                      id="title"
                      name="title"
                      value={currentPage?.title || ""}
                      onChange={handlePageInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="slug" className="text-right">
                      URL (slug)
                    </Label>
                    <Input
                      id="slug"
                      name="slug"
                      value={currentPage?.slug || ""}
                      onChange={handlePageInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="content" className="text-right">
                      Содержание
                    </Label>
                    <Textarea
                      id="content"
                      name="content"
                      value={currentPage?.content || ""}
                      onChange={handlePageInputChange}
                      className="col-span-3"
                      rows={5}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="metaTitle" className="text-right">
                      Meta Title
                    </Label>
                    <Input
                      id="metaTitle"
                      name="metaTitle"
                      value={currentPage?.metaTitle || ""}
                      onChange={handlePageInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="metaDescription" className="text-right">
                      Meta Description
                    </Label>
                    <Textarea
                      id="metaDescription"
                      name="metaDescription"
                      value={currentPage?.metaDescription || ""}
                      onChange={handlePageInputChange}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <Button onClick={handleAddPage}>{isEditing ? "Сохранить изменения" : "Добавить страницу"}</Button>
              </DialogContent>
            </Dialog>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Заголовок</TableHead>
                <TableHead>URL (slug)</TableHead>
                <TableHead>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pages.map((page) => (
                <TableRow key={page.id}>
                  <TableCell>{page.title}</TableCell>
                  <TableCell>{page.slug}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" onClick={() => handleEditPage(page)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeletePage(page.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="static" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Статический контент</h2>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  onClick={() => {
                    setCurrentStaticContent(null)
                    setIsEditing(false)
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Добавить контент
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{isEditing ? "Редактировать контент" : "Добавить новый контент"}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="key" className="text-right">
                      Ключ
                    </Label>
                    <Input
                      id="key"
                      name="key"
                      value={currentStaticContent?.key || ""}
                      onChange={handleStaticContentInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="value" className="text-right">
                      Значение
                    </Label>
                    <Input
                      id="value"
                      name="value"
                      value={currentStaticContent?.value || ""}
                      onChange={handleStaticContentInputChange}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <Button onClick={handleAddStaticContent}>
                  {isEditing ? "Сохранить изменения" : "Добавить контент"}
                </Button>
              </DialogContent>
            </Dialog>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ключ</TableHead>
                <TableHead>Значение</TableHead>
                <TableHead>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {staticContent.map((content) => (
                <TableRow key={content.id}>
                  <TableCell>{content.key}</TableCell>
                  <TableCell>{content.value}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" onClick={() => handleEditStaticContent(content)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteStaticContent(content.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Управление файлами</CardTitle>
          <CardDescription>Загрузка и управление изображениями и документами</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Button>
              <ImageIcon className="mr-2 h-4 w-4" />
              Загрузить изображение
            </Button>
            <Button variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Загрузить документ
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

