class CarFeaturePresenter < ApplicationPresenter
  MODEL_ATTRIBUTES = %i[id category description].freeze

  delegate(*MODEL_ATTRIBUTES, to: :record)

  def main
    {
      category:,
      description:
    }
  end
end
