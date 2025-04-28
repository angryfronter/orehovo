class ApplicationRecord < ActiveRecord::Base
  primary_abstract_class

  # Метод для репрезентации объекта модели
  #
  # @return [Object] Презентер или объект, если презентер не определен
  #
  # @example User.last.present
  #
  # @example_return UserPresenter
  def present(errors = {}, context = nil)
    return self unless presenter_class

    @present ||= presenter_class.new(self, errors, context)
  end

  private

  # Указание класса презентера и вывод ошибки если метод класса презентера не существует
  #
  # @return [Class] Класс презентера или ошибка
  #
  # @example User.last.presenter_class
  #
  # @example_return UserPresenter
  #
  # @example_return RuntimeError (Необходимо определить метод presenter в модели User)
  def presenter_class
    "#{self.class.name}Presenter".constantize
  rescue Zeitwerk::NameError
    raise "Необходимо определить метод presenter в модели #{self.class.name}"
  end
end
