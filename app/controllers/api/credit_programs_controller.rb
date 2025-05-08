class Api::CreditProgramsController < ApplicationController
  before_action :set_credit_program, only: %i[show destroy]

  def index
    credit_programs = CreditProgram.all

    render json: json_presented(credit_programs, 'credit_programs', 'main')
  end

  def show
    render json: json_presented(@credit_program, 'credit_program', 'main')
  end

  def create
    result = CreditPrograms::Operations::Create.call(params: credit_program_params)

    status, presenter = result.success? ? [:ok, 'main'] : [:unprocessable_content, 'data_errors']

    render json: json_presented(result[:model], 'credit_program', presenter, errors: result.errors), status:
  end

  def destroy
    return unless @credit_program.destroy

    render json: json_presented(@credit_program, 'credit_program', 'data_errors'), status: :ok
  end

  def update
    credit_program = CreditProgram.find(params[:id])
    if credit_program.update(credit_program_params)
      render json: { credit_program: credit_program }, status: :ok
    else
      render json: { error: "Failed to update credit_program" }, status: :unprocessable_entity
    end
  end

  private

  def set_credit_program
    @credit_program = CreditProgram.find_by(id: params[:id])

    return render_not_found_error unless @credit_program
  end

  def credit_program_params
    params.require(:credit_program).permit(
      :id, :name, :description, :interest_rate, :term, :down_payment, :visible, :min_amount, :max_amount, :started_at, :finished_at
    )
  end
end
