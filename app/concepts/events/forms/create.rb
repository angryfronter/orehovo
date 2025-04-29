module Events
  module Forms
    class Create < Base
      property :name
      property :description
      property :date
      property :location

      validation do
        params do
          optional(:name).maybe(:string)
          optional(:description).maybe(:string)
          optional(:date).maybe(:string)
          optional(:location).maybe(:string)
        end
      end
    end
  end
end
