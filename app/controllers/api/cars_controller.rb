class Api::CarsController < ApplicationController
  before_action :set_car, only: %i[show destroy]

  def index
    cars = Car.all

    cars = cars.is_hot_offer.limit(3) if params[:hot] == 'true'
    cars = cars.visible if params[:visible] == 'true'

    cars = cars.where("mark->>'name' = ?", params[:brand]) if params[:brand].present?
    cars = cars.where("model->>'name' = ?", params[:model]) if params[:model].present?
    cars = cars.where('price <= ?', params[:max_price].to_i) if params[:max_price].present?
    cars = cars.where("body_type->>'name' = ?", params[:body_type]) if params[:body_type].present? && params[:body_type] != "all"
    cars = cars.where("gearbox->>'name' = ?", params[:transmission]) if params[:transmission].present? && params[:transmission] != "all"
    cars = cars.where("drive_type->>'name' = ?", params[:drive_type]) if params[:drive_type].present? && params[:drive_type] != "all"

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
    @car = Car.find(params[:id])
    if params[:car][:promotions]
      # Заменяем массив строк на массив объектов
      promotion_ids = params[:car][:promotions].reject(&:blank?)
      @car.promotions = Promotion.where(id: promotion_ids)
    end

    if @car.update(car_params.except(:promotions))
      render json: { car: @car }
    else
      render json: { errors: @car.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def stats
    total_count = Car.count
    hot_count = Car.is_hot_offer.count
    visible_count = Car.visible.count

    render json: {
      total: total_count,
      hot: hot_count,
      visible: visible_count
    }
  end

  private

  def set_car
    @car = Car.find_by(id: params[:id])

    return render_not_found_error unless @car
  end

  def car_params
    params.require(:car).permit(:id, :external_id, :unique_id, :modification, :modification_auto_ru_xml_id, :complectation,
                                :car_type, :dealer_id, :dealer_name, :dealer_description, :engine_power, :engine_power_kwh,
                                :engine_volume, :is_active, :visible, :is_hot_offer, :year, :run, :price, :price_old, :vin,
                                :is_metallic, :description, :note, offer_type: {}, generation: {},
                                body_type: {}, mark: {}, model: {}, category: {}, section: {}, engine_type: {}, gearbox: {}, drive_type: {},
                                color: {}, wheel: {}, owners: {}, state: {}, passport: {}, specifications: [], equipment: {},
                                equipment_groups: {}, tags: [], credit_program_ids: [], images: [], promotions: [], car_colors_attributes: [
                                  :id, :name, :is_metallic, :_destroy, images: []]
    )
  end
end
