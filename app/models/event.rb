class Event < ApplicationRecord
  enum :event_type, [ :test_drive, :presentation, :sale ]

  has_many :event_applications, dependent: :destroy
end
