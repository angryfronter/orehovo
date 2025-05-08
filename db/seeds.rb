puts "Импортируем автомобили из Plex API..."
CarImporterService.import(5)
puts "Импорт завершён."

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
