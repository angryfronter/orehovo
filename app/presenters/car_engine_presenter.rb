class CarEnginePresenter < ApplicationPresenter
  MODEL_ATTRIBUTES = %i[id type power torque displacement].freeze

  delegate(*MODEL_ATTRIBUTES, to: :record)

  def main
    {
      type:,
      power:,
      torque:,
      displacement:
    }
  end
end
