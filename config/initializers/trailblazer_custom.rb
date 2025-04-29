# frozen_string_literal: true

Trailblazer::Operation::Railway::Result.class_eval do
  # Возвращает ошибки из объекта 'contract.default'.
  #
  # @return [Reform::Contract::Result::Errors]
  #
  # @example_return { errors: { amount: ['Должно быть десятичным числом'] } }
  def errors
    self['contract.default'].errors
  end
end
