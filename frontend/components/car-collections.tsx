import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const collections = [
  {
    title: "Семейные",
    image:
      "https://sjc.microlink.io/YkB4wqmEqltiSutqvdyuZt-8Y3-9nqoI1XQ8e_mc7esMPsCNKlXpO9Otj7nqoDz0LEt9h9QLvmzA7aWSLsuO5Q.jpeg",
    link: "/catalog?type=family",
    className: "col-span-1 row-span-1",
  },
  {
    title: "Для такси",
    image: "/placeholder.svg?height=200&width=400",
    link: "/catalog?type=taxi",
    className: "col-span-1 row-span-1",
  },
  {
    title: "Китайские новинки",
    image: "/placeholder.svg?height=400&width=600",
    link: "/catalog?brand=chinese",
    className: "col-span-2 row-span-2 bg-[#1e3a8a]",
  },
  {
    title: "Седаны",
    image: "/placeholder.svg?height=200&width=400",
    link: "/catalog?bodyType=sedan",
    className: "col-span-1 row-span-1",
  },
  {
    title: "Внедорожники",
    image: "https://sorentohybrid.kiavietnam.com.vn/storage/phien-ban-xe/kia-sorento-2020-edition-white-pearl-24.png",
    link: "/catalog?bodyType=suv",
    className: "col-span-1 row-span-1",
  },
]

export default function CarCollections() {
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Подборки</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          {collections.map((collection, index) => (
            <Link
              key={collection.title}
              href={collection.link}
              className={cn(
                "group relative overflow-hidden rounded-lg transition-transform hover:scale-[1.02]",
                collection.className,
              )}
            >
              <Card className="h-full border-0">
                <CardContent className="p-0 relative aspect-[2/1] h-full">
                  <Image
                    src={collection.image || "/placeholder.svg"}
                    alt={collection.title}
                    fill
                    className={collection.title === "Семейные" ? "object-fill" : "object-cover"}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">{collection.title}</h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

