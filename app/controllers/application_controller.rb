class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session

  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  before_action :set_locale

  # Метод рендерит ошибку 404
  #
  # @return [Hash] Возвращает сообщение об ошибке, если запрашиваемый ресурс не был найден в базе данных
  #
  # @example render_not_found_error
  #
  # @example_return { error: "Запись c таким id не найдена" }, status: :not_found
  #
  def render_not_found_error(attribute = :id)
    render json: {
      error: I18n.t('errors.messages.record_not_found', attribute:)
    }, status: :not_found
  end

  # Метод устанавливает локаль
  #
  # Устанавливает локаль приложения на основе заголовка Accept-Language или использует локаль по умолчанию(ru), если
  # заголовок не содержит поддерживаемого языка
  #
  # @example set_locale
  #
  # @return [Symbol] Установленная локаль
  def set_locale
    requested_locale = request.env['HTTP_ACCEPT_LANGUAGE'].to_s.split(',').map { |l| l.split(';').first }.find do |locale|
      I18n.available_locales.map(&:to_s).include?(locale)
    end
  
    I18n.locale = requested_locale || I18n.default_locale
  end

  # Подготовка данных для вывода в json-контроллеры
  #
  # @param records [Array] Массив записей, которые требуется представить в формате json.
  # @param root_name [Symbol, String] Название ключа в результирующем хэше.
  # @param presenter_method [Symbol, String] Метод презентера, который будет использоваться.
  # @param pagination_params [Hash] Параметры пагинации
  #
  # @return [Hash] Хэш с данными, представленными в формате json
  #
  # @example json_presented(User.all, :users, :main, { page: 1, per: 10 })
  #
  # @example_return { users: [{ id: "123", email: "example@mail.ru" }, { id: "1234", email: "example2@mail.ru" }] }
  def json_presented(records, root_name, presenter_method, errors: {}, pagination_params: {})
    return { "#{root_name}": [] } if records.blank?

    data_paginate = {}
    records_after_paginate = records

    # Если переданы параметры пагинации, добавьте пагинацию
    if pagination_params.present?
      pagy, records_after_paginate = pagy(records, limit: pagination_params[:limit], page: pagination_params[:page])

      data_paginate = { pagination: pagy_metadata(pagy) }
    end

    # Данные презентации с переданным методом презентера
    records_presented =
      if records.is_a?(ActiveRecord::Relation) || records.is_a?(Array)
        records_after_paginate.map { |b| present_as_json(b, presenter_method, errors) }
      else
        present_as_json(records, presenter_method, errors)
      end

    # Создание хэша с данными для вывода в формате json
    { "#{root_name}": records_presented }.merge(data_paginate)
  end

  private

  # Представление переданной записи методом, переданным презентером, и преобразование в формат json
  #
  # @param record [ActiveRecord::Base] Запись, которую нужно представить в JSON.
  # @param presenter_method [Symbol] Метод презентера для форматирования записи в JSON.
  #
  # @return [Hash, nil] Хэш с данными записи в формате json или nil, если запись пустая
  #
  # @example present_as_json(User.first, :main)
  #
  # @example_return { id: "123", email: "example@mail.ru" }
  def present_as_json(record, presenter_method, errors = {})
    return if record.blank?

    record.present(errors).send(presenter_method).as_json
  end
end
