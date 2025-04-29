class Event < ApplicationRecord
  enum :event_type, [ :test_drive, :presentation, :sale ]
end
