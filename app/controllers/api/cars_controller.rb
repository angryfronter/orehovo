class Api::CarsController < ApplicationController
  before_action :set_car, only: %i[show destroy]

  def index
    cars = Car.all

    render json: json_presented(cars, 'cars', 'main')
  end

  def show
    render json: json_presented(@car, 'car', 'main')
  end

  def create
    result = Cars::Operations::Create.call(params: car_params)

    status, presenter = result.success? ? [:ok, 'main'] : [:unprocessable_content, 'data_errors']

    render json: json_presented(result[:model], 'car', presenter, errors: result.errors), status:
  end

  def destroy
    return unless @car.destroy

    render json: json_presented(@car, 'car', 'data_errors'), status: :ok
  end

  def update
    car = Car.find(params[:id])
    if car.update(car_params)
      render json: { car: car }, status: :ok
    else
      render json: { error: "Failed to update car" }, status: :unprocessable_entity
    end
  end

  private

  def set_car
    @car = Car.find_by(id: params[:id])

    return render_not_found_error unless @car
  end

  def car_params
    params.require(:car).permit(
      :id, :brand, :model, :price, :year, :transmission, :drivetrain, :fuel_type, :fuel_tank, :body_type, :color,
      car_colors: %i[name hex], car_configurations: %i[name price features], car_engines: %i[engine_type power torque displacement],
      car_features: %i[category description]
    )
  end
end
