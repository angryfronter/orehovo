class CreateCarConfigurations < ActiveRecord::Migration[8.0]
  def change
    create_table :car_configurations do |t|
      t.references :car, foreign_key: true
      t.string :name
      t.integer :price
      t.text :features, array: true, default: []

      t.timestamps
    end
  end
end
