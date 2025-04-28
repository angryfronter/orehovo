class CreateCarColors < ActiveRecord::Migration[8.0]
  def change
    create_table :car_colors do |t|
      t.references :car, foreign_key: true
      t.string :name
      t.string :hex

      t.timestamps
    end
  end
end
