class EventPresenter < ApplicationPresenter
  MODEL_ATTRIBUTES = %i[id name description event_applications date location event_type].freeze

  delegate(*MODEL_ATTRIBUTES, to: :record)

  def main
    {
      id:,
      name:,
      description:,
      date: localize_time(date, :time_stamp),
      location:,
      event_type:,
      participants: present_records(event_applications, :main),
    }
  end
end
