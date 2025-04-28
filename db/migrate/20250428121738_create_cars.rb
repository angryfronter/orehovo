class CreateCars < ActiveRecord::Migration[8.0]
  def change
    create_table :cars do |t|
      t.string :brand
      t.string :model
      t.integer :price
      t.integer :year
      t.string :transmission
      t.string :drivetrain
      t.string :fuel_type
      t.integer :fuel_tank
      t.string :body_type
      t.string :color
      t.integer :discount

      t.timestamps
    end
  end
end
