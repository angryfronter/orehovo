module CreditPrograms
  module Forms
    class Create < Base
      property :name
      property :description
      property :interest_rate
      property :term
      property :down_payment

      validation do
        params do
          optional(:name).maybe(:string)
          optional(:description).maybe(:string)
          optional(:interest_rate).maybe(:integer)
          optional(:term).maybe(:integer)
          optional(:down_payment).maybe(:integer)
        end
      end
    end
  end
end
