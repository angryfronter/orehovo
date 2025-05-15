module Events
  module Operations
    class Create < Trailblazer::Operation
      step Model(Event, :new)
      step Contract::Build(constant: Events::Forms::Create)
      step Contract::Validate()
      step Contract::Persist()
      step :create_participants

      def create_participants(ctx, model:, params:, **)
        participants = Array.wrap(params[:participants])
        participants.each do |p|
          model.event_applications.create(p)
        end
      end
    end
  end
end
