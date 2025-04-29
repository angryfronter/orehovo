class Api::ContactsController < ApplicationController
  before_action :set_contact, only: %i[show destroy]

  def index
    contact = Contact.first

    render json: json_presented(contact, 'contact', 'main')
  end

  def show
    render json: json_presented(@contact, 'contact', 'main')
  end

  def create
    result = Contacts::Operations::Create.call(params: contact_params)

    status, presenter = result.success? ? [:ok, 'main'] : [:unprocessable_content, 'data_errors']

    render json: json_presented(result[:model], 'contact', presenter, errors: result.errors), status:
  end

  def destroy
    return unless @contact.destroy

    render json: json_presented(@contact, 'contact', 'data_errors'), status: :ok
  end

  def update
    contact = Contact.first
    if contact.update(contact_params)
      render json: { contact: contact }, status: :ok
    else
      render json: { error: "Failed to update contact" }, status: :unprocessable_entity
    end
  end

  private

  def set_contact
    @contact = Contact.find_by(id: params[:id])

    return render_not_found_error unless @contact
  end

  def contact_params
    params.require(:contact).permit(
      :id, :address, :phone, :email, :opening_hours,
      :website_name, :website_description, :facebook_link,
      :vk_link, :instagram_link
    )
  end
end
