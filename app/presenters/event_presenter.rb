class EventPresenter < ApplicationPresenter
  MODEL_ATTRIBUTES = %i[id name description date location event_type].freeze

  delegate(*MODEL_ATTRIBUTES, to: :record)

  def main
    {
      id:,
      name:,
      description:,
      date: localize_time(date, :time_stamp),
      location:,
      event_type:
    }
  end
end
