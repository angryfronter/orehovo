module Cars
  module Forms
    class Create < Base
      property :brand
      property :model
      property :price
      property :year
      property :transmission
      property :drivetrain
      property :fuel_type
      property :fuel_tank
      property :body_type
      property :color

      validation do
        params do
          optional(:brand).maybe(:string)
          optional(:model).maybe(:string)
          optional(:price).maybe(:integer)
          optional(:year).maybe(:integer)
          optional(:transmission).maybe(:string)
          optional(:drivetrain).maybe(:string)
          optional(:fuel_type).maybe(:string)
          optional(:fuel_tank).maybe(:integer)
          optional(:body_type).maybe(:string)
          optional(:color).maybe(:string)
        end
      end

      # collection :car_colors, form: CarColors::Forms::Base, populate_if_empty: CarColor
    end
  end
end
