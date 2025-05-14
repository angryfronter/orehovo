class Mark < ApplicationRecord
  has_many :cars
  has_many :models, dependent: :destroy
end
