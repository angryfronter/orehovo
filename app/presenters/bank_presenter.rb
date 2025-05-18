class BankPresenter < ApplicationPresenter
  MODEL_ATTRIBUTES = %i[id name description].freeze

  delegate(*MODEL_ATTRIBUTES, to: :record)
  delegate(:image, to: :record)

  def main
    {
      id:,
      name:,
      description:,
      image_url: file_url(image, :main)
    }
  end
end
