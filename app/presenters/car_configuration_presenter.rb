class CarConfigurationPresenter < ApplicationPresenter
  MODEL_ATTRIBUTES = %i[id name price features].freeze

  delegate(*MODEL_ATTRIBUTES, to: :record)

  def main
    {
      name:,
      price:,
      features:
    }
  end
end
