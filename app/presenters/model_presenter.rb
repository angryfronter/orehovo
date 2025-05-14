class ModelPresenter < ApplicationPresenter
  MODEL_ATTRIBUTES = %i[id name].freeze

  delegate(*MODEL_ATTRIBUTES, to: :record)

  def main
    {
      id:,
      name:
    }
  end
end
