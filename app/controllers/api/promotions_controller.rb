class Api::PromotionsController < ApplicationController
  before_action :set_promotion, only: %i[show destroy]

  def index
    promotions = Promotion.all

    render json: json_presented(promotions, 'promotions', 'main')
  end

  def show
    render json: json_presented(@promotion, 'promotion', 'main')
  end

  def create
    result = Promotions::Operations::Create.call(params: promotion_params)

    status, presenter = result.success? ? [:ok, 'main'] : [:unprocessable_content, 'data_errors']

    render json: json_presented(result[:model], 'promotion', presenter, errors: result.errors), status:
  end

  def destroy
    return unless @promotion.destroy

    render json: json_presented(@promotion, 'promotion', 'data_errors'), status: :ok
  end

  def update
    promotion = Promotion.find(params[:id])
    if promotion.update(promotion_params)
      render json: { promotion: promotion }, status: :ok
    else
      render json: { error: "Failed to update promotion" }, status: :unprocessable_entity
    end
  end

  private

  def set_promotion
    @promotion = Promotion.find_by(id: params[:id])

    return render_not_found_error unless @promotion
  end

  def promotion_params
    params.require(:promotion).permit(
      :id, :title, :description, :started_at, :finished_at
    )
  end
end
