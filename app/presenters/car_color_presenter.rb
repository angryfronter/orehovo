class CarColorPresenter < ApplicationPresenter
  MODEL_ATTRIBUTES = %i[id name hex].freeze

  delegate(*MODEL_ATTRIBUTES, to: :record)

  def main
    {
      name:,
      hex:
    }
  end
end
