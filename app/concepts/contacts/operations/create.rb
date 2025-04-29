module Contacts
  module Operations
    class Create < Trailblazer::Operation
      step Model(Contact, :new)
      step Contract::Build(constant: Contacts::Forms::Create)
      step Contract::Validate()
      step Contract::Persist()
    end
  end
end
