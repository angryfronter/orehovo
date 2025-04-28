class ApplicationPresenter
  include Rails.application.routes.url_helpers

  attr_reader :record, :view, :errors

  def initialize(record, errors = {}, view = nil)
    @record = record
    @errors = errors
    @view = view
  end

  def data_errors
    errors_to_present = errors.empty? ? record.errors : errors

    { errors: errors_to_present.messages }
  end

  def present_records(records, presenter_method, excluded_keys: [])
    records.map { |r| r.present(errors, view).send(presenter_method).except(*excluded_keys) }
  end

  def file_url(file_field, style = nil)
    return if file_field.blank?

    if style.present? && file_field.record.respond_to?(:image_variant)
      variant = file_field.record.image_variant(style)
      return url_for(variant) if variant
    end

    url_for(file_field)
  end

  def files_urls(files_field, style = nil)
    return [] if files_field.blank?

    files_field.map do |file|
      file_url(file, style)
    end
  end

  def localize_time(time, format = :default)
    I18n.l(time, format:) if time
  end

  private

  def properties
    record.attributes.symbolize_keys.slice(*self.class::MODEL_ATTRIBUTES)
  end
end
