module CreditPrograms
  module Operations
    class Create < Trailblazer::Operation
      step Model(CreditProgram, :new)
      step Contract::Build(constant: CreditPrograms::Forms::Create)
      step Contract::Validate()
      step Contract::Persist()
    end
  end
end
