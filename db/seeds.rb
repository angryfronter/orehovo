# Сначала создаем машину
car = Car.create!(
  brand: "BAIC",
  model: "U5 PLUS",
  year: 2023,
  price: 1670000,
  discount: 50000,
  transmission: "CVT",
  drivetrain: "FWD",
  fuel_type: "Gasoline",
  body_type: "Sedan",
  color: "Белый"
)

car.main_image.attach(
  io: File.open(Rails.root.join("frontend/public/baic.webp")),
  filename: "baic_u5_main.jpg",
  content_type: "image/jpeg"
)

car.car_engines.create!(
  engine_type: "Бензиновый",
  power: 113,
  torque: 142,
  displacement: 1499
)

car.car_dimensions.create!(
  length: 4660,
  width: 1820,
  height: 1480,
  wheelbase: 2670,
  ground_clearance: 140
)

car.car_configurations.create!([
  {
    name: "Comfort",
    price: 1670000,
    features: ['16" легкосплавные диски', "Тканевая обивка сидений", "Кондиционер", "4 подушки безопасности"],
  },
  {
    name: "Luxury",
    price: 1870000,
    features: [
      '17" легкосплавные диски',
      "Кожаная обивка сидений",
      "Климат-контроль",
      "6 подушек безопасности",
      "Панорамная крыша",
    ],
  },
])

car.car_colors.create!([
  { name: "Серебристый", hex: "#C0C0C0" },
  { name: "Белый", hex: "#FFFFFF" },
  { name: "Черный", hex: "#000000" },
  { name: "Красный", hex: "#FF0000" }
])
