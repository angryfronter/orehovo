class CreateCreditPrograms < ActiveRecord::Migration[8.0]
  def change
    create_table :credit_programs do |t|
      t.string :name
      t.text :description
      t.decimal :interest_rate, precision: 5, scale: 2
      t.integer :term
      t.decimal :down_payment, precision: 10, scale: 2

      t.timestamps
    end
  end
end
