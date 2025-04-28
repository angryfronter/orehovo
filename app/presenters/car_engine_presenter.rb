class CarEnginePresenter < ApplicationPresenter
  MODEL_ATTRIBUTES = %i[id engine_type power torque displacement].freeze

  delegate(*MODEL_ATTRIBUTES, to: :record)

  def main
    {
      engine_type:,
      power:,
      torque:,
      displacement:
    }
  end
end
