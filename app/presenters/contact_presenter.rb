class ContactPresenter < ApplicationPresenter
  MODEL_ATTRIBUTES = %i[id address phone email opening_hours website_name website_description facebook_link vk_link instagram_link].freeze

  delegate(*MODEL_ATTRIBUTES, to: :record)

  def main
    {
      id:,
      address:,
      phone:,
      email:,
      opening_hours:,
      website_name:,
      website_description:,
      facebook_link:,
      vk_link:,
      instagram_link:
    }
  end
end
