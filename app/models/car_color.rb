class CarColor < ApplicationRecord
  belongs_to :car
  has_many_attached :images
end
