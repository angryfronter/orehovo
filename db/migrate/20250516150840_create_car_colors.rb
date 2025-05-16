class CreateCarColors < ActiveRecord::Migration[8.0]
  def change
    create_table :car_colors, id: :uuid do |t|
      t.references :car, null: false, foreign_key: true, type: :uuid
      t.string :name
      t.string :hex

      t.timestamps
    end
  end
end
