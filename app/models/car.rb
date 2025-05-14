class Car < ApplicationRecord
  has_many_attached :images
  has_and_belongs_to_many :credit_programs
  has_and_belongs_to_many :promotions

  scope :is_hot_offer, -> { where(is_hot_offer: true) }
  scope :visible, -> { where(visible: true) }
end
