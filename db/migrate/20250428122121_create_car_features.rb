class CreateCarFeatures < ActiveRecord::Migration[8.0]
  def change
    create_table :car_features do |t|
      t.references :car, foreign_key: true
      t.string :category
      t.text :description, array: true, default: []

      t.timestamps
    end
  end
end
