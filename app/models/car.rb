class Car < ApplicationRecord
  has_many_attached :images
  has_many :car_colors
  has_many :car_engines
  has_many :car_features
  has_many :car_images
  has_many :car_configurations
end
