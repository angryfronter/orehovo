module Banks
  module Forms
    class Create < Base
      property :name
      property :description

      validation do
        params do
          optional(:name).maybe(:string)
          optional(:description).maybe(:string)
        end
      end
    end
  end
end
