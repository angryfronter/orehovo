module Events
  module Operations
    class Create < Trailblazer::Operation
      step Model(Event, :new)
      step Contract::Build(constant: Events::Forms::Create)
      step Contract::Validate()
      step Contract::Persist()
    end
  end
end
