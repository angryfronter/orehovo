class CarPresenter < ApplicationPresenter
  MODEL_ATTRIBUTES = %i[id brand model price year transmission drivetrain fuel_type fuel_tank body_type color].freeze

  delegate(*MODEL_ATTRIBUTES, to: :record)
  delegate(:car_colors, :car_engines, :car_features, :car_configurations, to: :record)
  delegate(:main_image, to: :record)
  delegate(:images, to: :record)

  def main
    {
      id:,
      brand:,
      model:,
      price:,
      year:,
      transmission:,
      drivetrain:,
      fuel_type:,
      fuel_tank:,
      body_type:,
      color:,
      car_colors: present_records(car_colors, :main),
      car_engines: present_records(car_engines, :main),
      car_features: present_records(car_features, :main),
      car_configurations: present_records(car_configurations, :main),
      image: file_url(main_image, :main),
      images: files_urls(images, :main)
    }
  end
end
