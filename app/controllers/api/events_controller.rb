class Api::EventsController < ApplicationController
  before_action :set_event, only: %i[show destroy]

  def index
    events = Event.all

    render json: json_presented(events, 'events', 'main')
  end

  def show
    render json: json_presented(@event, 'event', 'main')
  end

  def create
    result = Events::Operations::Create.call(params: event_params)

    status, presenter = result.success? ? [:ok, 'main'] : [:unprocessable_content, 'data_errors']

    render json: json_presented(result[:model], 'event', presenter, errors: result.errors), status:
  end

  def destroy
    return unless @event.destroy

    render json: json_presented(@event, 'event', 'data_errors'), status: :ok
  end

  def update
    event = Event.find(params[:id])
    if event.update(event_params)
      render json: { event: event }, status: :ok
    else
      render json: { error: "Failed to update event" }, status: :unprocessable_entity
    end
  end

  private

  def set_event
    @event = Event.find_by(id: params[:id])

    return render_not_found_error unless @event
  end

  def event_params
    params.require(:event).permit(
      :id, :name, :description, :date, :location, :event_type
    )
  end
end
