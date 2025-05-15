module Cars
  module Forms
    class Create < Base
      property :external_id
      property :unique_id
      property :mark
      property :model
      property :generation
      property :modification
      property :complectation
      property :body_type
      property :category
      property :car_type
      property :section
      property :dealer_id
      property :dealer_name
      property :dealer_description
      property :engine_power
      property :engine_power_kwh
      property :engine_volume
      property :engine_type
      property :gearbox
      property :drive_type
      property :color
      property :is_metallic
      property :wheel
      property :owners
      property :state
      property :passport
      property :year
      property :run
      property :price
      property :vin
      property :description
      property :note
      property :specifications
      property :equipment
      property :equipment_groups
      property :tags
      property :is_active
      property :visible
      property :is_hot_offer

      validation do
        params do
          optional(:external_id).maybe(:string)
          optional(:unique_id).maybe(:string)
          optional(:mark).maybe(:string)
          optional(:model).maybe(:string)
          optional(:generation).maybe(:string)
          optional(:modification).maybe(:string)
          optional(:complectation).maybe(:string)
          optional(:body_type).maybe(:string)
          optional(:category).maybe(:string)
          optional(:car_type).maybe(:string)
          optional(:section).maybe(:string)
          optional(:dealer_id).maybe(:integer)
          optional(:dealer_name).maybe(:string)
          optional(:dealer_description).maybe(:string)
          optional(:engine_power).maybe(:integer)
          optional(:engine_power_kwh).maybe(:integer)
          optional(:engine_volume).maybe(:float)
          optional(:engine_type).maybe(:string)
          optional(:gearbox).maybe(:string)
          optional(:drive_type).maybe(:string)
          optional(:color).maybe(:string)
          optional(:is_metallic).maybe(:bool)
          optional(:wheel).maybe(:string)
          optional(:owners).maybe(:string)
          optional(:state).maybe(:string)
          optional(:passport).maybe(:string)
          optional(:year).maybe(:integer)
          optional(:run).maybe(:integer)
          optional(:price).maybe(:integer)
          optional(:vin).maybe(:string)
          optional(:description).maybe(:string)
          optional(:note).maybe(:string)
          optional(:specifications).maybe(:array)
          optional(:equipment).maybe(:string)
          optional(:equipment_groups).maybe(:string)
          optional(:tags).maybe(:array)
          optional(:is_active).maybe(:bool)
          optional(:visible).maybe(:bool)
          optional(:is_hot_offer).maybe(:bool)
        end
      end
    end
  end
end
