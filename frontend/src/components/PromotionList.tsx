import React from "react"
import Image from "next/image"
import type { Promotion } from "@/types"

interface PromotionListProps {
  promotions: Promotion[]
}

export const PromotionList: React.FC<PromotionListProps> = React.memo(({ promotions }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {promotions.map((promotion) => (
        <div key={promotion.id} className="border rounded-lg overflow-hidden shadow-lg">
          <Image
            src={promotion.image || "/placeholder.svg"}
            alt={promotion.title}
            width={300}
            height={200}
            layout="responsive"
            objectFit="cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">{promotion.title}</h2>
            <p className="text-gray-600 mb-2">{promotion.description}</p>
            <p className="text-sm text-gray-500">
              {new Date(promotion.startDate).toLocaleDateString()} - {new Date(promotion.endDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
})

PromotionList.displayName = "PromotionList"

