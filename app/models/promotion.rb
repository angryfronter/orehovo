class Promotion < ApplicationRecord
  has_one_attached :image, dependent: :purge
  has_and_belongs_to_many :cars

  scope :visible, -> { where(visible: true) }
end
