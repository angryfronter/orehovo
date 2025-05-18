module Banks
  module Operations
    class Create < Trailblazer::Operation
      step Model(Bank, :new)
      step Contract::Build(constant: Banks::Forms::Create)
      step Contract::Validate()
      step Contract::Persist()
    end
  end
end
