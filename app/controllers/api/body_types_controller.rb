class Api::BodyTypesController < ApplicationController
  def index
    body_types = BodyType.all

    render json: json_presented(body_types, 'body_types', 'main')
  end
end