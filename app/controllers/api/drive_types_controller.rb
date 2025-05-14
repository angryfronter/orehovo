class Api::DriveTypesController < ApplicationController
  def index
    drive_types = DriveType.all

    render json: json_presented(drive_types, 'drive_types', 'main')
  end
end