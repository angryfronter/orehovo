class Api::BanksController < ApplicationController
  before_action :set_bank, only: %i[show destroy update]

  def index
    banks = Bank.all

    render json: json_presented(banks, 'banks', 'main')
  end

  def show
    render json: json_presented(@bank, 'bank', 'main')
  end

  def create
    result = Banks::Operations::Create.call(params: bank_params)

    status, presenter = result.success? ? [:ok, 'main'] : [:unprocessable_content, 'data_errors']

    render json: json_presented(result[:model], 'bank', presenter, errors: result.errors), status:
  end

  def destroy
    return unless @bank.destroy

    render json: json_presented(@bank, 'bank', 'data_errors'), status: :ok
  end

  def update
    bank = @bank
    if bank.update(bank_params)
      render json: { bank: bank }, status: :ok
    else
      render json: { error: "Failed to update bank" }, status: :unprocessable_entity
    end
  end

  private

  def set_bank
    @bank = Bank.find_by(id: params[:id])

    return render_not_found_error unless @bank
  end

  def bank_params
    params.require(:bank).permit(
      :id, :name, :description
    )
  end
end
