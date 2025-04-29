class CreditProgramPresenter < ApplicationPresenter
  MODEL_ATTRIBUTES = %i[id name description interest_rate term down_payment].freeze

  delegate(*MODEL_ATTRIBUTES, to: :record)
  delegate(:image, to: :record)

  def main
    {
      id:,
      name:,
      description:,
      interest_rate:,
      term:,
      down_payment:
    }
  end
end
