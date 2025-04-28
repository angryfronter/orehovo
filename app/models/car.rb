class Car < ApplicationRecord
  has_one_attached :main_image, dependent: :purge
  has_many_attached :images, dependent: :purge

  has_many :car_colors, dependent: :destroy
  has_many :car_engines, dependent: :destroy
  has_many :car_features, dependent: :destroy
  has_many :car_images, dependent: :destroy
  has_many :car_configurations, dependent: :destroy
  has_many :car_dimensions, dependent: :destroy
end
