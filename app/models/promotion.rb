class Promotion < ApplicationRecord
  has_one_attached :image, dependent: :purge
end
