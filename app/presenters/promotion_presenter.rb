class PromotionPresenter < ApplicationPresenter
  MODEL_ATTRIBUTES = %i[id title description started_at finished_at].freeze

  delegate(*MODEL_ATTRIBUTES, to: :record)
  delegate(:image, to: :record)

  def main
    {
      id:,
      title:,
      description:,
      started_at: localize_time(started_at, :time_stamp),
      finished_at: localize_time(finished_at, :time_stamp),
      image: file_url(image, :main),
    }
  end
end
