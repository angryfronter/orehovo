class Api::CarsController < ApplicationController
  before_action :set_car, only: %i[show]

  def index
    cars = Car.all

    render json: json_presented(cars, 'cars', 'main')
  end

  def show
    render json: json_presented(@car, 'car', 'main')
  end

  private

  def set_car
    @car = Car.first

    return render_not_found_error unless @car
  end
end
