class EventApplicationPresenter < ApplicationPresenter
  MODEL_ATTRIBUTES = %i[id full_name phone_number].freeze

  delegate(*MODEL_ATTRIBUTES, to: :record)

  def main
    {
      id:,
      full_name:,
      phone_number:,
    }
  end
end
