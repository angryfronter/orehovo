class CreateCarDimensions < ActiveRecord::Migration[8.0]
  def change
    create_table :car_dimensions do |t|
      t.references :car, foreign_key: true
      t.integer :length
      t.integer :width
      t.integer :height
      t.integer :wheelbase
      t.integer :ground_clearance

      t.timestamps
    end
  end
end
