class Api::GearboxesController < ApplicationController
  def index
    gearboxes = Gearbox.all

    render json: json_presented(gearboxes, 'gearboxes', 'main')
  end
end