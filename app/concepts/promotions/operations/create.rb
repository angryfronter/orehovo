module Promotions
  module Operations
    class Create < Trailblazer::Operation
      step Model(Promotion, :new)
      step Contract::Build(constant: Promotions::Forms::Create)
      step Contract::Validate()
      step Contract::Persist()
    end
  end
end
