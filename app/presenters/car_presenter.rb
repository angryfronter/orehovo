class CarPresenter < ApplicationPresenter
  MODEL_ATTRIBUTES = %i[id unique_id price year run vin description note is_active visible is_hot_offer mark model generation modification complectation color body_type
                        engine_power engine_volume engine_type gearbox drive_type car_type].freeze

  delegate(*MODEL_ATTRIBUTES, to: :record)
  delegate(:images, to: :record)

  def main
    {
      id:,
      unique_id:,
      mark: mark&.[]('name'),
      model: model&.[]('name'),
      generation: generation['title'],
      modification:,
      complectation:,
      price:,
      year:,
      run:,
      vin:,
      description:,
      note:,
      color: color['title'],
      body_type: body_type['name'],
      engine_power:,
      engine_volume:,
      engine_type: engine_type['title'],
      gearbox: gearbox['name'],
      drive_type: drive_type['name'],
      car_type:,
      is_active:,
      visible:,
      is_hot_offer:,
      images: files_urls(images, :main)
    }
  end
end
