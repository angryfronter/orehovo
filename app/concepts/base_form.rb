require 'reform/form/dry'

class BaseForm < Reform::Form
  feature Reform::Form::Dry

  module Types
    include Dry.Types()

    UUID = Dry.Types::String.constrained(format: /^[\d\w]{8}-[\d\w]{4}-[\d\w]{4}-[\d\w]{4}-[\d\w]{12}$/)
    Email = Dry.Types::String.constrained(format: /\A[\w+\-.]+@[a-z\d\-.]+\.(ru)\z/i)
    Phone = Dry.Types::String.constrained(format: /\A(\+7|7|8)?(\(?\d{3}\)?[\s-]?)?\d{3}[\s-]?\d{2}[\s-]?\d{2}\z/)
    File = Types.Instance(
      ActionDispatch::Http::UploadedFile
    ) | Types.Instance(
      Rack::Test::UploadedFile
    ) | Types.Instance(
      ActiveStorage::Blob
    ) | Types.Instance(
      ActiveStorage::Attached::One
    )
  end
end
