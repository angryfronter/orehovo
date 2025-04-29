module Promotions
  module Forms
    class Create < Base
      property :title
      property :description
      property :started_at
      property :finished_at
      property :image

      validation do
        params do
          optional(:title).maybe(:string)
          optional(:description).maybe(:string)
          optional(:started_at).maybe(:string)
          optional(:finished_at).maybe(:string)
          optional(:image).maybe(:string)
        end
      end
    end
  end
end
