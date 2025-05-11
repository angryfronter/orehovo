class CreateCreditPrograms < ActiveRecord::Migration[8.0]
  def change
    create_table :credit_programs, id: :uuid do |t|
      t.string :name
      t.text :description
      t.decimal :interest_rate, precision: 5, scale: 2
      t.integer :term
      t.decimal :down_payment, precision: 10, scale: 2
      t.boolean  :visible, default: true
      t.decimal :min_amount, precision: 15, scale: 2
      t.decimal :max_amount, precision: 15, scale: 2
      t.datetime :started_at
      t.datetime :finished_at

      t.timestamps
    end
  end
end
