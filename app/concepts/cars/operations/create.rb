module Cars
  module Operations
    class Create < Trailblazer::Operation
      step Model(Car, :new)
      step Contract::Build(constant: Cars::Forms::Create)
      step Contract::Validate()
      step Contract::Persist()
    end
  end
end
