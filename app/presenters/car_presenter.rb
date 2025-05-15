class CarPresenter < ApplicationPresenter
  MODEL_ATTRIBUTES = %i[id unique_id price year run vin description note is_active visible is_hot_offer mark model generation modification complectation color body_type
                        engine_power engine_volume engine_type gearbox drive_type car_type category owners equipment equipment_groups].freeze

  delegate(*MODEL_ATTRIBUTES, to: :record)
  delegate(:images, to: :record)

  def main
    {
      id:,
      unique_id:,
      mark:,
      model:,
      generation:,
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
      category: category['title'],
      owners: owners['title'],
      equipment:,
      equipment_groups:,
      images: files_urls(images, :main),
    }
  end
end
