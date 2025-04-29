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

Promotion.create!(
  title: "Летняя распродажа",
  description: "Скидки до 15% на все модели",
  started_at: "2023-06-01",
  finished_at: "2023-08-31"
)

CreditProgram.create!(
  name: "Стандартный кредит",
  description: "Базовая программа кредитования",
  interest_rate: 9.9,
  term: 60,
  down_payment: 20
)

Event.create!(
  name: "Тест-драйв нового BAIC X35",
  description: "Приглашаем вас на тест-драйв нового кроссовера BAIC X35",
  location: "Автосалон BAIC",
  date: Date.new(2023, 7, 15)
)

Contact.create!(
  address: "г. Москва, ул. Ленина, д. 1",
  phone: "+7 (495) 123-45-67",
  email: "example@example.com",
  opening_hours: "Пн-Пт: 9:00 - 18:00, Сб-Вс: выходной",
  website_name: "ДЦ Орехово",
  website_description: "Официальный дилер BAIC в Москве",
  facebook_link: "https://facebook.com/dc-orehovo",
  vk_link: "https://vk.com/dc-orehovo",
  instagram_link: "https://instagram.com/dc-orehovo"
)
