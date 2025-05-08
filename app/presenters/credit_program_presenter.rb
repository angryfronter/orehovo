class CreditProgramPresenter < ApplicationPresenter
  MODEL_ATTRIBUTES = %i[id name description interest_rate term down_payment visible min_amount max_amount started_at finished_at].freeze

  delegate(*MODEL_ATTRIBUTES, to: :record)
  delegate(:image, to: :record)

  def main
    {
      id:,
      name:,
      description:,
      interest_rate:,
      term:,
      down_payment:,
      visible:,
      min_amount:,
      max_amount:,
      started_at: localize_time(started_at, :time_stamp),
      finished_at: localize_time(finished_at, :time_stamp),
    }
  end
end
