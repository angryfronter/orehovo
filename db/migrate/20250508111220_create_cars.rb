class CreateCars < ActiveRecord::Migration[8.0]
  def change
    create_table :cars, id: :uuid do |t|
      t.integer  :external_id
      t.string   :unique_id

      t.jsonb    :offer_type, default: {}
      t.jsonb    :mark, default: {}
      t.jsonb    :model, default: {}
      t.jsonb    :generation, default: {}

      t.string   :modification
      t.string   :modification_auto_ru_xml_id
      t.string   :complectation

      t.jsonb    :body_type, default: {}
      t.jsonb    :category, default: {}
      t.string   :car_type
      t.jsonb    :section, default: {}

      t.integer  :dealer_id
      t.string   :dealer_name
      t.text     :dealer_description

      t.integer  :engine_power
      t.integer  :engine_power_kwh
      t.float    :engine_volume

      t.jsonb    :engine_type, default: {}
      t.jsonb    :gearbox, default: {}
      t.jsonb    :drive_type, default: {}
      t.jsonb    :color, default: {}

      t.boolean  :is_metallic

      t.jsonb    :wheel, default: {}
      t.jsonb    :owners, default: {}
      t.jsonb    :state, default: {}
      t.jsonb    :passport, default: {}

      t.integer  :year
      t.integer  :run
      t.integer  :price
      t.integer  :price_old
      t.string   :vin

      t.text     :description
      t.text     :note

      t.jsonb    :specifications, default: []
      t.jsonb    :equipment, default: {}
      t.jsonb    :equipment_groups, default: {}
      t.jsonb    :tags, default: []

      t.boolean  :is_active

      t.datetime :remote_created_at
      t.datetime :remote_updated_at

      t.boolean  :visible, default: true
      t.boolean  :is_hot_offer, default: false

      t.timestamps
    end
  end
end
