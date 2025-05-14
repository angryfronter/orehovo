class Api::ModelsController < ApplicationController
  def index
    models = Model.where(mark_id: params[:mark_id])

    render json: json_presented(models, 'models', 'main')
  end
end