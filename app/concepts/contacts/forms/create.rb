module Contacts
  module Forms
    class Create < Base
      property :address
      property :phone
      property :email
      property :opening_hours
      property :website_name
      property :website_description
      property :facebook_link
      property :vk_link
      property :instagram_link

      validation do
        params do
          optional(:address).maybe(:string)
          optional(:phone).maybe(:string)
          optional(:email).maybe(:string)
          optional(:opening_hours).maybe(:string)
          optional(:website_name).maybe(:string)
          optional(:website_description).maybe(:string)
          optional(:facebook_link).maybe(:string)
          optional(:vk_link).maybe(:string)
          optional(:instagram_link).maybe(:string)
        end
      end
    end
  end
end
