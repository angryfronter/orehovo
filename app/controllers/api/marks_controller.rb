class Api::MarksController < ApplicationController
  def index
    marks = Mark.all

    render json: json_presented(marks, 'marks', 'main')
  end
end