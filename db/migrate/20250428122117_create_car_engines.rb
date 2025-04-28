class CreateCarEngines < ActiveRecord::Migration[8.0]
  def change
    create_table :car_engines do |t|
      t.references :car, foreign_key: true
      t.string :type
      t.integer :power
      t.integer :torque
      t.integer :displacement

      t.timestamps
    end
  end
end
