interface CarSpecificationsProps {
  specifications: any // Replace with proper type
}

export default function CarSpecifications({ specifications }: CarSpecificationsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Object.entries(specifications).map(([key, value]) => (
        <div key={key} className="flex justify-between">
          <span className="font-semibold">{key}:</span>
          <span>{value}</span>
        </div>
      ))}
    </div>
  )
}

