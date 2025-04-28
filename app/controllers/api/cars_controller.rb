class Api::CarsController < ApplicationController
  before_action :set_car, only: %i[show]

  def index
    cars = Car.all

    render json: json_presented(cars, 'cars', 'main')
  end

  def show
    render json: json_presented(@car, 'car', 'main')
  end

  def create
    result = Cars::Operations::Create.call(params: create_params)

    status, presenter = result.success? ? [:ok, 'main'] : [:unprocessable_content, 'data_errors']

    render json: json_presented(result[:model], 'car', presenter, errors: result.errors), status:
  end

  private

  def set_car
    @car = Car.first

    return render_not_found_error unless @car
  end

  def create_params
    params.require(:car).permit(
      :brand, :model, :price, :year, :transmission, :drivetrain, :fuel_type, :fuel_tank, :body_type, :color,
      car_colors: %i[name hex], car_configurations: %i[name price features], car_engines: %i[type power torque displacement],
      car_features: %i[category description]
    )
  end
end
