class Car < ApplicationRecord
  has_one_attached :main_image, dependent: :purge
  has_many_attached :images, dependent: :purge

  has_many :car_colors
  has_many :car_engines
  has_many :car_features
  has_many :car_images
  has_many :car_configurations
  has_many :car_dimensions
end
